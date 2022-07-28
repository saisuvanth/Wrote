import { tokenExists } from '../middlewares/user';
import { Router } from 'express';
import * as userController from '../controllers/userController';
import { PRequest } from '../types';

const userRouter = Router();


userRouter.post('/login', userController.loginUsingMail);

userRouter.post('/google', userController.loginUsingGoogle);

userRouter.post('/register', userController.registerUsingMail);

userRouter.get('/verify/:token', userController.verifyToken);

userRouter.get('/check', tokenExists, (req: PRequest<{}, {}, {}>, res, next) => {
	console.log(req.user);
	res.status(200).json({ message: 'User logged in', user: req.user })
})


userRouter.delete('/logout', tokenExists, userController.logout);




export default userRouter;