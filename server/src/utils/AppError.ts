import { StatusCodes } from 'http-status-codes';

class AppError extends Error {
	statusCode: StatusCodes;

	constructor(statusCode: StatusCodes, message: string) {
		super(message);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;