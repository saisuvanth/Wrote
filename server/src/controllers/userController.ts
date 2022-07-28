import { NextFunction, Request, Response } from 'express';
import Node from '../models/Nodes';
import User from '../models/User';
import { IUser, LoginReqBody, PRequest } from '../types';
import { setCookie, sendMail } from '../utils';
import AppError from '../utils/AppError';
import { NodeEnum } from '../utils/constants';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { StatusCodes } from 'http-status-codes';

const client = new OAuth2Client({ clientId: '25271568058-3olmjkgn2o92cb6fpd0dfplpk8f2apo4.apps.googleusercontent.com' });

const loginUsingMail = async (req: Request<{}, {}, LoginReqBody>, res: Response, next: NextFunction) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return next(new AppError(400, 'Please fill all the fields'));
	}
	try {
		let user = await User.findOne({ 'local.username': username });
		user?.update()
		if (!user || (await user.comparePassword(password))) {
			return next(new AppError(401, 'Incorrect username or password'));
		} else {
			const token = await user.generateToken();
			setCookie(res, token);
			res.status(200).json({ message: 'Login successful' });
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
}

const loginUsingGoogle = async (req: Request, res: Response, next: NextFunction) => {
	const response = await client.verifyIdToken({ idToken: req.body.credential, audience: '25271568058-3olmjkgn2o92cb6fpd0dfplpk8f2apo4.apps.googleusercontent.com' });
	const { email, exp, sub, name, at_hash } = response.getPayload() as TokenPayload;
	let user = await User.findOne({ email });
	if (user) {
		if (user.google) {
			user.google.exp = exp.toString();
			user.tokens.push(at_hash as string);
			user = await user.save();
			setCookie(res, at_hash as string);
			return res.status(200).json({ message: 'Login Successful' })
		}
		return next(new AppError(400, 'Email is already in use'));
	}
	try {
		let node = new Node({ type: NodeEnum.BOARD, name: 'Home', x: 0, y: 0, children: [] });
		node = await node.save();
		console.log(node._id)
		user = new User({ email, google: { googleId: sub, exp, name: name }, tokens: [at_hash], node: node._id });
		user = await user.save();
		setCookie(res, at_hash as string);
		return res.status(200).json({ message: 'Login Successful' })
	} catch (err) {
		console.log(err);
		next();
	}
}

const registerUsingMail = async (req: Request, res: Response, next: NextFunction) => {
	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		return next(new AppError(400, 'Please fill all the fields'));
	}
	try {
		let node = new Node({ type: NodeEnum.BOARD, name: 'Home', x: 0, y: 0, children: [] });
		node = await node.save();
		console.log(node._id)
		let user = new User({ email, local: { username, password }, node: node._id });
		user = await user.save();
		res.status(200).json({ message: 'User created successfully' });
		await sendMail(user);
	} catch (err) {
		console.error(err);
		next(err);
	}
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await User.findByToken(req.params.token);
		if (!user) return next(new AppError(400, 'User not found'));
		user.local.email_verified = true;
		user.tokens = [];
		try {
			const savedUser = await user.save();
			console.log(savedUser);
			res.redirect(`${process.env.FRONTEND_URL}`);
		} catch (err) {
			console.log(err);
			next(new AppError(500, 'Internal Server Error'));
		}
	} catch (err) {
		next(new AppError(400, 'No Route Found'));
	}
}

const logout = async (req: PRequest<{}, {}, {}>, res: Response, next: NextFunction) => {
	console.log(req.user);
	let { user } = req;
	await user?.removeToken(req.cookies.auth);
	console.log(user);
	res.clearCookie('auth')
		.status(200).json({ message: 'User Logged Out' });
}



export { loginUsingMail, registerUsingMail, loginUsingGoogle, verifyToken, logout };