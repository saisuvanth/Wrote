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
exports.tokenExists = void 0;
const User_1 = __importDefault(require("../models/User"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const tokenExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const token = ((_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.auth) ? (_b = req === null || req === void 0 ? void 0 : req.cookies) === null || _b === void 0 ? void 0 : _b.auth : (_d = (_c = req.headers) === null || _c === void 0 ? void 0 : _c.authorization) === null || _d === void 0 ? void 0 : _d.split(" ")[1];
    console.log(token);
    if (token) {
        try {
            const user = yield User_1.default.findByToken(req.cookies.auth);
            if (user) {
                if (user.local && !user.local.email_verified) {
                    next(new AppError_1.default(401, 'Please Confirm your email address'));
                }
                req.user = user;
                next();
            }
            else {
                next(new AppError_1.default(401, 'Please log in to access this page'));
            }
        }
        catch (err) {
            if (err.name === 'JsonWebTokenError') {
                try {
                    const guser = yield User_1.default.findByGoogleToken(token);
                    if (guser) {
                        req.user = guser;
                        next();
                    }
                    else
                        next(new AppError_1.default(401, 'Please log in to access to the page'));
                }
                catch (e) {
                    next(new AppError_1.default(401, e));
                }
            }
        }
    }
    else {
        next(new AppError_1.default(401, 'Please log in to access this page'));
    }
});
exports.tokenExists = tokenExists;
