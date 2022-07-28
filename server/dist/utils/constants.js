"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequired = exports.NodeEnum = void 0;
var NodeEnum;
(function (NodeEnum) {
    NodeEnum["BOARD"] = "Board";
    NodeEnum["NOTE"] = "Note";
    NodeEnum["TODO"] = "To-do";
    NodeEnum["LINE"] = "Line";
    NodeEnum["LINK"] = "Link";
})(NodeEnum = exports.NodeEnum || (exports.NodeEnum = {}));
const getRequired = (type, match) => {
    if (type === match)
        return true;
    return false;
};
exports.getRequired = getRequired;
