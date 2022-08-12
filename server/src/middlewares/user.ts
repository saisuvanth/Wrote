import { NextFunction, Response } from "express";
import { PRequest } from "../types";
import User from '../models/User';
import AppError from '../utils/AppError';

const tokenExists = async (req: PRequest<{}, {}, {}>, res: Response, next: NextFunction) => {
	let token = req?.cookies?.auth ? req?.cookies?.auth : req.headers?.authorization?.split(" ")[1];
	console.log(token);
	// token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmUxMmUwM2M0OWYzY2U0OGEzMzNiYjgiLCJpYXQiOjE2NTkyMTM2OTMsImV4cCI6MTY1OTgxODQ5M30.ZXVm1b6i_B7HYLe8E-v7efdP9QKOFQszMKDb5UQaaRo';
	if (token) {
		try {
			const user = await User.findByToken(token);
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
		if (process.env.NODE_ENV === 'development') {

			const user = await User.findById('62e12e03c49f3ce48a333bb8');
			if (user) {
				req.user = user;
				next();
			}
		} else {
			next(new AppError(401, 'Please log in to access this page'));
		}
	}
}









export { tokenExists };