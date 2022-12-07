import express, { NextFunction, Request, Response } from "express";
import verifyAdmin from "../02-Middleware/verify-admin";
import { BrandModel } from "../03-Models/brand-model";
import { PhoneModel } from "../03-Models/phone-model";
import brandsLogic from "../05-BLL/brands-logic";


const router = express.Router();

// Get All Brands:
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const brands = await brandsLogic.getAllBrands();
            res.json(brands);
      } catch (err: any) {
            next(err);
      }
});

// Get One Brand By Id
router.get("/:brandId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const brandId = req.params.brandId;
            const brand = await brandsLogic.getOneBrand(brandId);
            res.json(brand);
      } catch (err: any) {
            next(err);
      }
});

// Add New Brand:
router.post("/", verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
      try {
            const brandToAdd = new BrandModel(await req.body);
            const addedBrand = await brandsLogic.addNewBrand(brandToAdd);
            res.status(200).json(addedBrand);
      } catch (err: any) {
            next(err);
      }
});

// Update Brand:
router.put('/',verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
      try {
            const brandToUpdate = new BrandModel(req.body);
            const updatedBrand = await brandsLogic.updateBrand(brandToUpdate);
            res.status(201).json(updatedBrand);
      } catch (err: any) {
            next(err);
      }
});

// Delete Brand By Id:
router.delete('/:brandId',verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
      try {
            const brandIdToDelete = req.params.brandId;
            await brandsLogic.deleteBrand(brandIdToDelete);
      } catch (err: any) {

      }
});

export default router;