import { Model } from 'sequelize';
import Random from '../utils/random';
import { hash } from '../utils/hashUtil';

const PROTECTED_ATTRIBUTES = ['password'];

export default (sequelize, DataTypes) => {
  // eslint-disable-next-line global-require
  class User extends Model {
    toJSON() {
      // hide protected fields
      const attributes = { ...this.get() };
      // eslint-disable-next-line no-restricted-syntax
      for (const a of PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
      return attributes;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address',
      },
      unique: {
        args: true,
        msg: 'Email already exists',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address',
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    verified: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
  });

  /**
   * Create a new personal access token for the user.
   *
   * @return Object
   * @param device_name
   */
  User.prototype.newToken = async function newToken(device_name = 'Chrome browser') {
    const plainTextToken = Random(40);

    const token = await this.createToken({
      name: device_name,
      token: hash(plainTextToken),
    });

    return {
      accessToken: token,
      plainTextToken: `${token.id}|${plainTextToken}`,
    };
  };

  return User;
};
