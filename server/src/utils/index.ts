import { Response } from "express";
import { IUser, UserDoc } from "../types";
import nodemailer from 'nodemailer';


const setCookie = (res: Response, token: string) => {
	res.cookie('auth', token, {
		expires: new Date(
			Date.now() + 24 * 60 * 60 * 1000
		),
		secure: true,
	});
}


const sendMail = async (user: UserDoc) => {
	const mailServer = nodemailer.createTransport({
		service: "gmail",
		host: 'smtp.gmail.com',
		secure: true,
		auth: {
			user: "rookievesper@gmail.com",
			pass: "owzgbldliemugoru",
		},
	});
	const token = await user.generateToken();
	console.log(token);
	const html =
		"<h2>Please click the link below to verify your email</h2>" +
		'<a href="http://localhost:8080/auth/verify/' +
		token +
		'">Verify Here</a>';
	const mailOptions = {
		from: "rookievesper@gmail.com",
		to: user.email,
		subject: "Please confirm your Email account",
		html: html,
	};
	mailServer.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
		} else {
			console.log(info);
		}
	});
}

export { setCookie, sendMail };