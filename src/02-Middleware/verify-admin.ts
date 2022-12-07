import { NextFunction, Request, Response } from "express";
import jwt from "../01-Utils/jwt";
import ClientError from "../03-Models/client-error";
import Role from "../03-Models/role";

async function verifyAdmin(request: Request, response: Response, next: NextFunction): Promise<void> {

    const isValid = await jwt.verifyToken(request);

    if(!isValid) {
        const error = new ClientError(401, "Invalid or expired token");
        next(error);
        return;
    }

    const user = jwt.getUserFromToken(request);

    if(user.roleId !== Role.Admin) {
        const error = new ClientError(403, "You are not authorized");
        next(error);
        return;
    }

    next();
}

export default verifyAdmin;
