import { Op } from 'sequelize';
import model from '../models';
import {
  validate,
  inValidEmail,
  inValidPassword,
  magicTrimmer, emptyInput,
} from '../utils/validator';
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';
import Random from '../utils/random';
import {hash, hash_equals} from "../utils/hashUtil";

const { User, Sport, PersonalAccessToken, Verification } = model;

/**
 * UserController.
 */
export default {
  async signUp(req, res) {
    try {
      const userData = magicTrimmer(req.body);
      const { name, email, password, phone, sports } = userData;

      // validate inputs
      const schema = {
        name: emptyInput(name, 'Name'),
        email: inValidEmail(email),
        password: inValidPassword(password),
        phone: emptyInput(phone, 'Phone number'),
      };

      const error = validate(schema);
      if (error) return sendErrorResponse(res, 422, error);

      const user = await User.findOne({ where: { [Op.or]: [
        { phone: { [Op.eq]: phone } },
        { email: { [Op.eq]: email } },
      ] } });
      if (user && user.email === email) return sendErrorResponse(res, 409, 'User with that email already exists');
      if (user && user.phone === phone) return sendErrorResponse(res, 409, 'Phone number already exists');

      const newUser = await User.create({
        name,
        email,
        password: hash(password),
        phone,
      });

      const userSports = await Sport.findAll({ where: { id: sports } });
      await newUser.addSport(userSports);

      await Verification.create({
        email: email,
        token: Random(8),
      });

      // await sendVerificationEmail(email, token);
      return sendSuccessResponse(res, 201, {
        message: 'Kindly check your email for link to verify your account.',
      });
    } catch (e) {
      console.error(e);
      return sendErrorResponse(res, 500, 'Server error, contact admin to resolve issue', e);
    }
  },

  async signIn(req, res) {
    const userData = magicTrimmer(req.body);
    const { login, password, device_name } = userData;

    const schema = {
      login: emptyInput(login, 'Login details'),
      password: emptyInput(password, 'Password'),
    };

    const error = validate(schema);
    if (error) return sendErrorResponse(res, 422, error);

    try {
      let where;
      if (inValidEmail(login) === null) {
        where = { email: login };
      } else {
        where = { phone: login };
      }
      const user = await User.findOne({ where });

      if (!user) return sendErrorResponse(res, 404, 'Account does not exist');
      const checkPassword = hash_equals(hash(password), user.password);
      if (!checkPassword) {
        return sendErrorResponse(res, 400, 'Invalid login credentials');
      }
      if (!user.verified) {
        return sendErrorResponse(res, 401, 'Kindly verify your account');
      }
      const token = await user.newToken(device_name);
      return sendSuccessResponse(res, 200, {
        token: token.plainTextToken,
      }, 'Login successfully');
    } catch (e) {
      console.error(e);
      return sendErrorResponse(res, 500, 'Server error, contact admin to resolve issue', e);
    }
  },

  async me(req, res) {
    try {
      return sendSuccessResponse(res, 200, req.userData);
    } catch (e) {
      console.error(e);
      return sendErrorResponse(res, 500, 'Server error, contact admin to resolve issue', e);
    }
  },

  async profile(req, res) {
    try {
      const sports = await req.userData.getSports()
      return sendSuccessResponse(res, 200, { sports });
    } catch (e) {
      console.error(e);
      return sendErrorResponse(res, 500, 'Server error, contact admin to resolve issue', e);
    }
  },

  async logout(req, res) {
    try {
      const { option } = req.body;
      let account = req.currentAccessToken;
      if (option && (option === 'all' || option === 'except-current')) {
        const tokens = await req.userData.getTokens();
        if (option === 'except-current') account = tokens.filter(item => item.token !== req.currentAccessToken).map(({ token }) => token);
        if (option === 'all') account = tokens.map(({ token }) => token);
      }

      await PersonalAccessToken.destroy({ where: { token: account } });

      return sendSuccessResponse(res, 200, 'You have logged out, we wish to see you on our platform soon');
    } catch (e) {
      return sendErrorResponse(res, 500, 'Server error, contact admin to resolve issue', e);
    }
  },
};
