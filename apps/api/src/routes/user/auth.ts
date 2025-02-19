import express from 'express';
import { deleteUser, logIn, signUpUser, updateUser } from '../../controllers/users/auth';
import protectMiddileWare from '../../middleware/protect';

const authRouter = express.Router();

authRouter.route("/login").post(logIn);
authRouter.route("/signup").post(signUpUser);
authRouter.route("/delete/:userId").delete(protectMiddileWare, deleteUser);
authRouter.route("/updateuser").post();
authRouter.route("/verify/:userId").post(protectMiddileWare, updateUser);

export default authRouter;