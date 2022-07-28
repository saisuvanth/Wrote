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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validator_1 = __importDefault(require("validator"));
const LocalUser = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: [validator_1.default.isAlphanumeric, 'Username must contain only letters and numbers'],
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        // minlength: [8, 'Password must be at least 8 characters long'],
        // select: false,
    },
}, { _id: false });
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator_1.default.isEmail, '{VALUE} is not a valid email']
    },
    local: {
        type: LocalUser,
        required: false,
    },
    google: new mongoose_1.Schema({
        googleId: String,
        exp: String,
        name: String,
    }, { _id: false }),
    tokens: [String],
    node: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Nodes'
    }
});
UserSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        console.log(user.local.password, password);
        return yield bcryptjs_1.default.compare(user.local.password, password);
    });
};
UserSchema.methods.generateToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const token = jsonwebtoken_1.default.sign({ _id: user._id.toHexString() }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        }).toString();
        user.tokens.push(token);
        yield user.save();
        return token;
    });
};
UserSchema.statics.findByGoogleToken = function (token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield this.findOne({ tokens: token });
            if (!user)
                throw 'User not found';
            const curTime = Date.now() / 1000;
            if (curTime > parseInt(user.google.exp)) {
                return false;
            }
            return { email: user.email, name: user.google.name };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
};
UserSchema.statics.findByToken = function (token) {
    return __awaiter(this, void 0, void 0, function* () {
        let payload;
        try {
            // payload = jwt.verify(token, process.env.JWT_SECRET as any, { complete: true });
            console.log(payload);
        }
        catch (e) {
            throw e;
            console.log(e);
        }
        return yield this.findOne({ tokens: token }, '-tokens');
    });
};
UserSchema.methods.removeToken = function (token) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        console.log(user.token);
        return yield user.update({
            $pull: {
                tokens: token,
            },
        });
    });
};
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('in pre');
        if (!this.isModified("local.password"))
            return;
        this.local.password = yield bcryptjs_1.default.hash(this.local.password, 10);
        next();
    });
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
