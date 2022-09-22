import express, { NextFunction, Request, Response } from "express";
import storeLogic from "../05-BLL/store-logic";

const router = express.Router();

router.get("/all-phones", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const phones = await storeLogic.getAllPhones();
            res.json(phones);
      } catch (err: any) {
            next(err);
      }
});

router.get("/all-brands", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const brands = await storeLogic.getAllBrands();
            res.json(brands);
      } catch (err: any) {
            next(err);
      }
});

router.get("/phones-by-brandId/:brandId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const brandId = req.params.brandId;
            const phones = await storeLogic.getPhonesByBrandId(brandId);
            res.json(phones);
      } catch (err: any) {
            next(err);
      }
});


export default router;