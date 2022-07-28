"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const error_1 = __importDefault(require("./middlewares/error"));
const nodeRouter_1 = __importDefault(require("./routes/nodeRouter"));
dotenv_1.default.config({ path: "./.env" });
const PORT = process.env.PORT || 3000;
const DB = process.env.MONGO_URI || '';
const app = (0, express_1.default)();
app.set('trust proxy', 1);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ credentials: true, origin: 'http://localhost:3000' }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use('/auth', userRouter_1.default);
app.use('/nodes', nodeRouter_1.default);
app.use(error_1.default);
mongoose_1.default
    .connect(DB)
    .then((g) => {
    console.log("database successfully connected");
    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}`);
    });
});
