import express, { NextFunction, Request, Response } from "express";
import { BrandModel } from "../03-Models/brand-model";
import { PhoneModel } from "../03-Models/phone-model";
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

router.post("/all-phones", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const phoneToAdd = new PhoneModel(req.body);
            const addedPhone = await storeLogic.addNewPhone(phoneToAdd);
            res.status(200).json(addedPhone);
      } catch (err: any) {
            next(err);
      }
});

router.post("/add-brands", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const brandToAdd = new BrandModel(await req.body);
            const addedBrand = await storeLogic.addNewBrand(brandToAdd);
            res.status(200).json(addedBrand);
      } catch (err: any) {
            next(err);
      }
});

export default router;