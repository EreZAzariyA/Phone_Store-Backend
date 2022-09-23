import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import errorsHandler from "./02-Middleware/errors-handler";
import ClientError from "./03-Models/client-error";
import authController from "./06-Controller/auth-controller";
import storeController from "./06-Controller/store-controller";
import shoppingCartController from "./06-Controller/shopping-cart controller";


const server = express();
server.use(cors());
const port = +process.env.PORT || 5000;

server.use(express.json());
server.use("/api", storeController);
server.use("/api/auth", authController);
server.use("/api/shopping-carts", shoppingCartController);

server.use("*", (req: Request, res: Response, next: NextFunction) => {
      const error = new ClientError(404, "Route Not Found");
      next(error);
});

server.use(errorsHandler);

server.listen(port, () => console.log(`Listening on port: ${port}...`));



