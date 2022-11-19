import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import errorsHandler from "./02-Middleware/errors-handler";
import ClientError from "./03-Models/client-error";
import storeController from "./06-Controller/store-controller";
import authController from "./06-Controller/auth-controller";
import phonesController from "./06-Controller/phones-controller";
import brandsController from "./06-Controller/brands-controller";
import shoppingCartController from "./06-Controller/shopping-cart controller";


const server = express();
server.use(cors());
const port = +process.env.PORT || 5001;

server.use(express.json());
server.use("/api", storeController);

server.use("/api/phones", phonesController);
server.use("/api/brands", brandsController);

server.use("/api/auth", authController);
server.use("/api/shopping-carts", shoppingCartController);

server.use("*", (req: Request, res: Response, next: NextFunction) => {
      const error = new ClientError(404, "Route Not Found");
      next(error);
});

server.use(errorsHandler);

server.listen(port, () => console.log(`Listening on port: ${port}...`));



