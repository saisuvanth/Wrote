import { NextFunction, Response } from "express";
import { PRequest } from "../types";
import User from '../models/User';
import AppError from '../utils/AppError';

const tokenExists = async (req: PRequest<{}, {}, {}>, res: Response, next: NextFunction) => {
	let token = req?.cookies?.auth ? req?.cookies?.auth : req.headers?.authorization?.split(" ")[1];
	token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNzQ0OGYyZmYzMWI0YTc5ZDYxOTUiLCJpYXQiOjE2NTg3NDYyMjQsImV4cCI6MTY1ODgzMjYyNH0.UXA8fj4lzr4pNOCP7SpD_rZUkXp1b2SWD50q0E8GLhQ';
	console.log(token);
	if (token) {
		try {
			const user = await User.findByToken(req.cookies.auth);
			if (user) {
				if (user.local && !user.local.email_verified) {
					next(new AppError(401, 'Please Confirm your email address'));
				}
				req.user = user;
				next();
			} else {
				next(new AppError(401, 'Please log in to access this page'))
			}
		} catch (err: any) {
			if (err.name === 'JsonWebTokenError') {
				try {
					const guser = await User.findByGoogleToken(token);
					if (guser) {
						req.user = guser;
						next();
					} else next(new AppError(401, 'Please log in to access to the page'))
				} catch (e) { next(new AppError(401, e as string)); }
			} else {
				console.log(err);
			}
		}
	} else {
		next(new AppError(401, 'Please log in to access this page'));
	}
}









export { tokenExists };