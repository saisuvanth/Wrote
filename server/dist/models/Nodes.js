"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const mongoose_1 = require("mongoose");
const TodoSchema = new mongoose_1.Schema({
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
});
const NodeSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
        enum: constants_1.NodeEnum
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
        required() {
            return (0, constants_1.getRequired)(this.type, constants_1.NodeEnum.BOARD);
        }
    },
    note: {
        type: String,
        required() {
            return (0, constants_1.getRequired)(this.type, constants_1.NodeEnum.NOTE);
        }
    },
    todo: {
        type: [TodoSchema],
        required() {
            return (0, constants_1.getRequired)(this.type, constants_1.NodeEnum.TODO);
        },
        default: void 0,
    },
    link: {
        type: String,
        required() {
            return (0, constants_1.getRequired)(this.type, constants_1.NodeEnum.LINK);
        }
    },
    children: {
        type: [{
                type: mongoose_1.Types.ObjectId,
                ref: 'Nodes'
            }],
        required() {
            return (0, constants_1.getRequired)(this.type, constants_1.NodeEnum.BOARD);
        },
        default: void 0,
    }
});
const Node = (0, mongoose_1.model)('Nodes', NodeSchema);
exports.default = Node;
