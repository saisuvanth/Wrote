import { NextFunction, Response } from "express";
import { PRequest } from "../types";
import User from '../models/User';
import AppError from '../utils/AppError';

const tokenExists = async (req: PRequest<{}, {}, {}>, res: Response, next: NextFunction) => {
	let token = req?.cookies?.auth ? req?.cookies?.auth : req.headers?.authorization?.split(" ")[1];
	token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmUxMmUwM2M0OWYzY2U0OGEzMzNiYjgiLCJpYXQiOjE2NTkwNDIwNTcsImV4cCI6MTY1OTEyODQ1N30.98GIVPO3nHjQgUzz4VwJeIzdmX__Xmh_4Yb6CfgxQi0';
	console.log(token);
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
		next(new AppError(401, 'Please log in to access this page'));
	}
}









export { tokenExists };