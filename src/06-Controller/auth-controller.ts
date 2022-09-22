import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../03-Models/credentials-model";
import UserModel from "../03-Models/user-model";
import authLogic from "../05-BLL/auth-logic";


const router = express.Router();

//Register
router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const user = new UserModel(req.body);
            const token = await authLogic.register(user);
            res.status(201).json(token);
            console.log(token);
            
      } catch (err: any) {
            next(err);
      }
});

//Login
router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const credentials = new CredentialsModel(req.body);
            const token = await authLogic.login(credentials);
            res.status(201).json(token);
      } catch (err: any) {
            next(err);
      }
});



export default router;