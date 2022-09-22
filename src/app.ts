import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import errorsHandler from "./02-Middleware/errors-handler";
import ClientError from "./03-Models/client-error";
import authController from "./06-Controller/auth-controller";


const server = express();
server.use(cors());
const port = +process.env.PORT || 5000;

server.use(express.json());
server.use("/api/auth", authController);

server.use("*", (req: Request, res: Response, next: NextFunction) => {
      const error = new ClientError(404, "Route Not Found");
      next(error);
});

server.use(errorsHandler);

server.listen(port, () => console.log(`Listening on port: ${port}...`));



