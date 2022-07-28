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
exports.createOrUpdateHomeNodes = exports.getHomeNodes = void 0;
const Nodes_1 = __importDefault(require("../models/Nodes"));
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../utils/AppError"));
const getHomeNodes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { id } = req.params;
    if (id) {
        const nodes = yield Nodes_1.default.findById(id).populate('children');
        console.log(nodes);
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'OK', result: { nodes } });
    }
    else {
        console.log(user === null || user === void 0 ? void 0 : user.node);
        const nodes = yield Nodes_1.default.findById(user === null || user === void 0 ? void 0 : user.node).populate('children');
        console.log(nodes);
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'OK', result: { nodes } });
    }
});
exports.getHomeNodes = getHomeNodes;
const _createOrUpdate = (node, res, next, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!node._id) {
        try {
            let my_node = new Nodes_1.default(node);
            if (node.type === 'Board')
                my_node.children = [];
            let save_node = yield my_node.save();
            const homeNode = yield Nodes_1.default.updateOne({ _id: id }, { $push: { children: my_node._id } });
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Nodes Created', id: save_node._id });
        }
        catch (err) {
            console.log(err);
            next(new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, err));
        }
    }
    else {
        try {
            let my_node = yield Nodes_1.default.updateOne({ _id: node._id }, Object.assign({}, node));
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Updated Node' });
        }
        catch (err) {
            console.log(err);
            next(new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, err));
        }
    }
});
const createOrUpdateHomeNodes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const node = req.body;
    const { id } = req.params;
    console.log(node);
    if (id) {
        _createOrUpdate(node, res, next, id);
    }
    else {
        _createOrUpdate(node, res, next, (_a = req.user) === null || _a === void 0 ? void 0 : _a.node);
    }
});
exports.createOrUpdateHomeNodes = createOrUpdateHomeNodes;
