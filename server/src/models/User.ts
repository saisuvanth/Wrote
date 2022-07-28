import { Schema, model, Model, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { verify, sign } from 'jsonwebtoken';
import validator from 'validator'
import { IGoogleUser, ILocalUser, IUser, IUserMethods, IUserModel, TokenData } from '../types';
import { promisify } from 'util';

const LocalUser = new Schema<ILocalUser>({
	username: {
		type: String,
		required: true,
		unique: true,
		validate: [validator.isAlphanumeric, 'Username must contain only letters and numbers'],
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


const UserSchema = new Schema<IUser, IUserModel, IUserMethods>({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: [validator.isEmail, '{VALUE} is not a valid email']
	},
	local: {
		type: LocalUser,
		required: false,
	},
	google: new Schema<IGoogleUser>({
		googleId: String,
		exp: String,
		name: String,
	}, { _id: false }),
	tokens: [String],
	node: {
		type: Types.ObjectId,
		ref: 'Nodes'
	}
})


UserSchema.methods.comparePassword = async function (password) {
	const user = this;
	console.log(user.local.password, password)
	return await bcrypt.compare(user.local.password, password);
}

UserSchema.methods.generateToken = async function () {
	const user = this;
	const token: string = sign({ _id: user._id.toHexString() }, process.env.JWT_SECRET as any, {
		expiresIn: "7d",
	}).toString();
	user.tokens.push(token);
	await user.save()
	return token;
}

UserSchema.statics.findByGoogleToken = async function (token) {
	try {
		const user = await this.findOne({ tokens: token });
		if (!user) throw 'User not found';
		const curTime = Date.now() / 1000;
		if (curTime > parseInt(user.google.exp)) {
			return false;
		}
		return { email: user.email, name: user.google.name };
	} catch (err) {
		console.log(err);
		throw err;
	}
}

UserSchema.statics.findByToken = async function (token: string) {
	let payload;
	try {
		console.log(payload)
		payload = verify(token, process.env.JWT_SECRET as any) as TokenData;
	} catch (e) {
		throw e;
		console.log(e);
	}
	return await this.findOne({ tokens: token }, '-tokens');
}

UserSchema.methods.removeToken = async function (token) {
	const user = this;
	console.log(user.token);
	return await user.update({
		$pull: {
			tokens: token,
		},
	});
};

UserSchema.pre("save", async function (next) {
	console.log('in pre');
	if (!this.isModified("local.password")) return;
	this.local.password = await bcrypt.hash(this.local.password, 10);
	next();
})

const User = model<IUser, IUserModel>('User', UserSchema);

export default User;