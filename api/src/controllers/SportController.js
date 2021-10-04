import model from '../models';
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';

const { Sport } = model;

/**
 * SportController.
 */
export default {
    async index(req, res) {
        try {
            return sendSuccessResponse(res, 201, await Sport.findAll({}));
        } catch (e) {
            console.error(e);
            return sendErrorResponse(res, 500, 'Server error, contact admin to resolve issue', e);
        }
    },
};
