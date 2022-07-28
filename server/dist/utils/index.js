"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.setCookie = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const setCookie = (res, token) => {
    res.cookie('auth', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: false,
    });
};
exports.setCookie = setCookie;
const sendMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const mailServer = nodemailer_1.default.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
            user: "rookievesper@gmail.com",
            pass: "owzgbldliemugoru",
        },
    });
    const token = yield user.generateToken();
    console.log(token);
    const html = "<h2>Please click the link below to verify your email</h2>" +
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
        }
        else {
            console.log(info);
        }
    });
});
exports.sendMail = sendMail;
