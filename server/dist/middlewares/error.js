"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.info('errorHandler');
    console.error(err);
    if (res.headersSent) {
        return next(err);
    }
    else if (err.name === "ValidationError") {
        res.status(400).json({ message: 'Validation Error' });
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        res.status(400).json({ message: 'Duplicate entry' });
    }
    else {
        const { statusCode = 500, message = 'Internal Server error' } = err;
        res.status(statusCode)
            .json({ message: message });
    }
};
exports.default = errorHandler;
