import { Response } from "express";

/**
 * Handles a successful API response.
 *
 * @param {CustomResponse} res - The response object to send the response with.
 * @param {boolean} status - send true or false in the response.
 * @param {number} statusCode - The HTTP status code to send in the response.
 * @param {*} data - The data to include in the response.
 * @param {string} message - The message to include in the response.
 */
export const SUCCESS_RESPONSE = (
  res: Response,
  status: boolean,
  statusCode: number,
  data: object | undefined,
  message: string
) => {
  res.status(statusCode).json({
    status,
    data,
    message,
  });
};

/**
 * Handles an error API response.
 *
 * @param {CustomResponse} res - The response object to send the response with.
 * @param {boolean} status - send true or false in the response.
 * @param {number} statusCode - The HTTP status code to send in the response.
 * @param {string} message - The error message to include in the response.
 */
export const ERROR_RESPONSE = (
  res: Response,
  status: boolean,
  statusCode: number,
  message: string
) => {
  res.status(statusCode).json({ status, error: message });
};
