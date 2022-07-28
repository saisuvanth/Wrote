import { Request } from "express";
import { Document, Model, HydratedDocument, Types } from "mongoose";
import { NodeEnum } from "./utils/constants";


export interface ITodo {
	title: string;
	complete: boolean;
	due: Date;
}

export interface INode extends Document {
	type: string;
	x: number;
	y: number;
	name?: string;
	note?: string;
	todo?: ITodo;
	link?: string;
	children?: Array<INode>;
}

export interface ILocalUser {
	username: string;
	email_verified: boolean;
	password: string;
}
export interface IGoogleUser {
	googleId: string;
	exp: string;
	name: string;
}

export interface IUser {
	email: string;
	local: ILocalUser;
	google: IGoogleUser;
	tokens: string[];
	node: INode;
}

export interface SignedToken {
	token: string;
}

export interface TokenData {
	_id: string;
}

export interface IUserMethods {
	comparePassword(password: string): Promise<boolean>;
	generateToken(): Promise<string>;
	removeToken(token: string): Promise<void>;
}

export interface IUserModel extends Model<IUser, {}, IUserMethods> {
	findByGoogleToken(token: string): Promise<HydratedDocument<IUser, IUserMethods>>;
	findByToken(token: string): Promise<HydratedDocument<IUser, IUserMethods>>;
}
export type LoginReqBody = {
	username: string;
	password: string;
}

export type UserDoc = (Document<unknown, any, IUser> & IUser & { _id: Types.ObjectId; } & IUserMethods);

export interface PRequest<P, B, Q> extends Request<P, {}, B, Q> {
	user?: UserDoc;
}
