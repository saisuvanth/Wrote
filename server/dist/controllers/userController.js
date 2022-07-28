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
exports.logout = exports.verifyToken = exports.loginUsingGoogle = exports.registerUsingMail = exports.loginUsingMail = void 0;
const Nodes_1 = __importDefault(require("../models/Nodes"));
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils");
const AppError_1 = __importDefault(require("../utils/AppError"));
const constants_1 = require("../utils/constants");
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client({ clientId: '25271568058-3olmjkgn2o92cb6fpd0dfplpk8f2apo4.apps.googleusercontent.com' });
const loginUsingMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return next(new AppError_1.default(400, 'Please fill all the fields'));
    }
    try {
        let user = yield User_1.default.findOne({ 'local.username': username });
        user === null || user === void 0 ? void 0 : user.update();
        if (!user || (yield user.comparePassword(password))) {
            return next(new AppError_1.default(401, 'Incorrect username or password'));
        }
        else {
            const token = yield user.generateToken();
            (0, utils_1.setCookie)(res, token);
            res.status(200).json({ message: 'Login successful' });
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.loginUsingMail = loginUsingMail;
const loginUsingGoogle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.verifyIdToken({ idToken: req.body.credential, audience: '25271568058-3olmjkgn2o92cb6fpd0dfplpk8f2apo4.apps.googleusercontent.com' });
    const { email, exp, sub, name, at_hash } = response.getPayload();
    let user = yield User_1.default.findOne({ email });
    if (user) {
        if (user.google) {
            user.google.exp = exp.toString();
            user.tokens.push(at_hash);
            user = yield user.save();
            (0, utils_1.setCookie)(res, at_hash);
            return res.status(200).json({ message: 'Login Successful' });
        }
        return next(new AppError_1.default(400, 'Email is already in use'));
    }
    try {
        let node = new Nodes_1.default({ type: constants_1.NodeEnum.BOARD, name: 'Home', x: 0, y: 0, children: [] });
        node = yield node.save();
        console.log(node._id);
        user = new User_1.default({ email, google: { googleId: sub, exp, name: name }, tokens: [at_hash], node: node._id });
        user = yield user.save();
        (0, utils_1.setCookie)(res, at_hash);
        return res.status(200).json({ message: 'Login Successful' });
    }
    catch (err) {
        console.log(err);
        next();
    }
});
exports.loginUsingGoogle = loginUsingGoogle;
const registerUsingMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return next(new AppError_1.default(400, 'Please fill all the fields'));
    }
    try {
        let node = new Nodes_1.default({ type: constants_1.NodeEnum.BOARD, name: 'Home', x: 0, y: 0, children: [] });
        node = yield node.save();
        console.log(node._id);
        let user = new User_1.default({ email, local: { username, password }, node: node._id });
        user = yield user.save();
        res.status(200).json({ message: 'User created successfully' });
        yield (0, utils_1.sendMail)(user);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
exports.registerUsingMail = registerUsingMail;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByToken(req.params.token);
        if (!user)
            return next(new AppError_1.default(400, 'User not found'));
        user.local.email_verified = true;
        user.tokens = [];
        try {
            const savedUser = yield user.save();
            console.log(savedUser);
            res.redirect(`${process.env.FRONTEND_URL}`);
        }
        catch (err) {
            console.log(err);
            next(new AppError_1.default(500, 'Internal Server Error'));
        }
    }
    catch (err) {
        next(new AppError_1.default(400, 'No Route Found'));
    }
});
exports.verifyToken = verifyToken;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user);
    let { user } = req;
    yield (user === null || user === void 0 ? void 0 : user.removeToken(req.cookies.auth));
    console.log(user);
    res.clearCookie('auth')
        .status(200).json({ message: 'User Logged Out' });
});
exports.logout = logout;
