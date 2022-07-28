import { NextFunction, Response } from "express";
import Node from "../models/Nodes";
import { INode, PRequest, UserDoc } from "../types";
import { StatusCodes } from 'http-status-codes';
import AppError from "../utils/AppError";

const getHomeNodes = async (req: PRequest<{ id?: string }, {}, {}>, res: Response, next: NextFunction) => {
	const { user } = req;
	const { id } = req.params;
	if (id) {
		const nodes = await Node.findById(id).populate('children');
		console.log(nodes);
		res.status(StatusCodes.OK).json({ message: 'OK', result: { nodes } });
	} else {
		console.log(user?.node);
		const nodes = await Node.findById(user?.node).populate('children');
		console.log(nodes);
		res.status(StatusCodes.OK).json({ message: 'OK', result: { nodes } });
	}
}

const _createOrUpdate = async (node: any, res: Response, next: NextFunction, id: any) => {
	if (!node._id) {
		try {
			let my_node = new Node(node);
			if (node.type === 'Board') my_node.children = [];
			let save_node = await my_node.save();
			const homeNode = await Node.updateOne({ _id: id }, { $push: { children: my_node._id } });
			res.status(StatusCodes.OK).json({ message: 'Nodes Created', id: save_node._id });
		} catch (err) {
			console.log(err);
			next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, err as string));
		}
	} else {
		try {
			let my_node = await Node.updateOne({ _id: node._id }, { ...node });
			res.status(StatusCodes.OK).json({ message: 'Updated Node' });
		} catch (err) {
			console.log(err);
			next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, err as string));
		}
	}
}


const createOrUpdateHomeNodes = async (req: PRequest<{ id?: string }, any, {}>, res: Response, next: NextFunction) => {
	const node = req.body;
	const { id } = req.params;
	console.log(node);
	if (id) {
		_createOrUpdate(node, res, next, id);
	} else {
		_createOrUpdate(node, res, next, req.user?.node);
	}
}















export { getHomeNodes, createOrUpdateHomeNodes }