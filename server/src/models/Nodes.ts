import { NodeEnum, getRequired } from "../utils/constants";
import { Schema, model, Types } from 'mongoose';
import { INode, ITodo } from "../types";

const TodoSchema = new Schema<ITodo>({
	title: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,
		default: false
	},
	due: {
		type: Date
	}
})

const NodeSchema = new Schema<INode>({
	type: {
		type: String,
		required: true,
		enum: NodeEnum
	},
	x: {
		type: Number,
		required: true,
	},
	y: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required(this: INode) {
			return getRequired(this.type, NodeEnum.BOARD);
		}
	},
	note: {
		type: String,
		required(this: INode) {
			return getRequired(this.type, NodeEnum.NOTE);
		}
	},
	todo: {
		type: [TodoSchema],
		required(this: INode) {
			return getRequired(this.type, NodeEnum.TODO);
		},
		default: void 0,
	},
	link: {
		type: String,
		required(this: INode) {
			return getRequired(this.type, NodeEnum.LINK);
		}
	},
	children: {
		type: [{
			type: Types.ObjectId,
			ref: 'Nodes'
		}],
		required(this: INode) {
			return getRequired(this.type, NodeEnum.BOARD)
		},
		default: void 0,
	}
});



const Node = model<INode>('Nodes', NodeSchema);
export default Node;