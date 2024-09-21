import express from "express";
import userData from "../data/user.data";
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "../utils/response";
import { STATUS_CODES, STATUS_MESSAGE } from "../utils/constants";
import { StatType } from "../utils/enums";

const userRouter = express.Router();

/**
 * Retrieves a sorted list of users based on their kill-to-death ratio.
 * @param {express.Request} req - The Express request object containing the query parameters.
 * @param {express.Response} res - The Express response object to send the sorted users data.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 * @throws {Error} - If an error occurs during the process.
 */
userRouter.get("/", (req, res) => {
  try {
    // get search/sorting params
    const top = Number(req.query?.top) || 30;

    const sortedUsers = [...userData]
      .sort(
        (a, b) =>
          b.stats[StatType.KILL_COUNT] -
          b.stats[StatType.DEATH_COUNT] -
          (a.stats[StatType.KILL_COUNT] - a.stats[StatType.DEATH_COUNT])
      )
      .slice(0, top);
    return SUCCESS_RESPONSE(
      res,
      true,
      STATUS_CODES.SUCCESS,
      sortedUsers,
      STATUS_MESSAGE.DATA_SUCCESS
    );
  } catch (err) {
    console.error(err);
    return ERROR_RESPONSE(
      res,
      false,
      STATUS_CODES.SERVER_ERROR,
      STATUS_MESSAGE.SERVER_ERROR
    );
  }
});

/**
 * Updates a user's statistics based on the provided parameters.
 * @param {express.Request} req - The Express request object containing the user ID and the new statistics.
 * @param {express.Response} res - The Express response object to send the updated user data or an error response.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
userRouter.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { stat, value } = req.body;
    const user = userData.find((u) => u.id == Number(id));

    if (user) {
      if (stat in user?.stats) {
        user.stats[stat as StatType] = Number(value);
        return SUCCESS_RESPONSE(
          res,
          true,
          STATUS_CODES.SUCCESS,
          user,
          STATUS_MESSAGE.DATA_UPDATED
        );
      } else {
        return ERROR_RESPONSE(
          res,
          false,
          STATUS_CODES.BAD_REQUEST,
          STATUS_MESSAGE.BAD_REQUEST
        );
      }
    } else {
      return ERROR_RESPONSE(
        res,
        false,
        STATUS_CODES.NOT_FOUND,
        STATUS_MESSAGE.DATA_NOT_FOUND
      );
    }
  } catch (err) {
    console.error(err);
    return ERROR_RESPONSE(
      res,
      false,
      STATUS_CODES.SERVER_ERROR,
      STATUS_MESSAGE.SERVER_ERROR
    );
  }
});

export default userRouter;
