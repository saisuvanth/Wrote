"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const mongoose_1 = require("mongoose");
const NodeSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
        enum: constants_1.NodeEnum
    },
    name: {
        type: String,
        required: () => {
            return true;
        }
    }
});
