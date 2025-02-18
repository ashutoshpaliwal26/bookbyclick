import express from 'express';
import { logIn, signUpUser } from '../../controllers/users/auth';

const authRouter = express.Router();

authRouter.route("/login").post(logIn);
authRouter.route("/signup").post(signUpUser);
authRouter.route("/delete").post();
authRouter.route("/updateuser").post();

export default authRouter;