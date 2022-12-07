import express, { NextFunction, Request, Response } from "express";
import verifyAdmin from "../02-Middleware/verify-admin";
import { PhoneModel } from "../03-Models/phone-model";
import phonesLogic from "../05-BLL/phones-logic";


const router = express.Router();

// Get All Phones:
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const phones = await phonesLogic.getAllPhones();
            res.json(phones);
      } catch (err: any) {
            next(err);
      }
});

// Get One Phone By Id:
router.get("/:phoneId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const phoneId = req.params.phoneId;
            const phoneById = await phonesLogic.getOnePhoneByPhoneId(phoneId);
            res.json(phoneById);
      } catch (err: any) {
            next(err);
      }
})


// Get All Phones By Brand Id:
router.get("/phones-by-brandId/:brandId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const brandId = req.params.brandId;
            const phones = await phonesLogic.getPhonesByBrandId(brandId);
            res.json(phones);
      } catch (err: any) {
            next(err);
      }
});

// Add New Phone:
router.post("/", verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
      try {
            const phoneToAdd = new PhoneModel(req.body);
            const addedPhone = await phonesLogic.addNewPhone(phoneToAdd);
            res.status(200).json(addedPhone);
      } catch (err: any) {
            next(err);
      }
});

// Update Phone:
router.put('/', async (req: Request, res: Response, next: NextFunction) => {
      try {
            const phoneToUpdate = new PhoneModel(req.body);
            const updatedPhone = await phonesLogic.updatePhone(phoneToUpdate);
            res.status(201).json(updatedPhone);
      } catch (err: any) {
            next(err);
      }
});

// Delete Phone By Id:
router.delete('/:phoneId', async (req: Request, res: Response, next: NextFunction) => {
      try {
            const phoneIdToDelete = req.params.phoneId;
            await phonesLogic.deletePhone(phoneIdToDelete);
            res.status(201).json("Deleted Successfully...");
      } catch (err: any) {
            next(err);
      }
});

export default router;