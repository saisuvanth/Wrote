import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { Express } from 'express';
import cors from 'cors';
import cookie from 'cookie-parser';
import morgan from 'morgan';
import userRouter from './routes/userRouter';
import errorHandler from './middlewares/error';
import nodeRouter from './routes/nodeRouter';
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;
const DB = process.env.MONGO_URI || '';

const app: Express = express();

app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookie());
app.use(morgan('dev'))

app.use('/auth', userRouter);
app.use('/nodes', nodeRouter);

app.use(errorHandler);

mongoose
	.connect(DB)
	.then((g: any) => {
		console.log("database successfully connected");
		app.listen(PORT, () => {
			console.log(`App running on port ${PORT}`);
		});
	});

