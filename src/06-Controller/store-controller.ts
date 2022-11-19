import express, { Request, Response, NextFunction } from "express";
import storeLogic from "../05-BLL/store-logic";


const router = express.Router();

router.get('/top-three', async (req: Request, res: Response, next: NextFunction) => {
      try {
            const topThree = await storeLogic.getTopThreeProducts();
            res.json(topThree);
      } catch (err: any) {
            next(err);
      }
});

router.put('/top-three/:phoneId', async (req: Request, res: Response, next: NextFunction) => {
      try {
            const phoneIdToUpdate = req.params.phoneId;
            const updatedTopThree = await storeLogic.updateTopThree(phoneIdToUpdate);
            res.status(201).json(updatedTopThree);
      } catch (err: any) {
            next(err);
      }
});

router.get('/top-brands', async (req: Request, res: Response, next: NextFunction) => {
      try {
            const topBrands = await storeLogic.getTopBrands();
            res.json(topBrands);
      } catch (err: any) {
            next(err);
      }
});

export default router;