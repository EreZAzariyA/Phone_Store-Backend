import { BrandModel } from "../03-Models/brand-model";
import dal from "../04-DAL/dal";
import { v4 as uuid } from "uuid";

async function getAllBrands(): Promise<BrandModel[]> {
      const sql = "SELECT * FROM brands";
      const brands = await dal.execute(sql);
      return brands;
};

async function getOneBrand(brandId: string): Promise<BrandModel> {
      const sql = `SELECT * FROM brands WHERE brandId = '${brandId}'`;
      const brands = await dal.execute(sql);
      const brand = brands[0];
      return brand;
}

async function addNewBrand(brand: BrandModel): Promise<BrandModel> {
      brand.brandId = uuid();
      const sql = `INSERT INTO brands VALUES (
                                          '${brand.brandId}',
                                          '${brand.brand}')`;
      await dal.execute(sql);
      return brand;
}

async function updateBrand(brandToUpdate: BrandModel): Promise<BrandModel>{
      const sql = `UPDATE brands SET brand = '${brandToUpdate.brand}',img='${brandToUpdate.img}' WHERE brandId = '${brandToUpdate.brandId}'`;
      const updatedBrand = await dal.execute(sql);
      return updatedBrand;
}

async function deleteBrand(brandIdToDelete: string): Promise<void> {
      const sql = `DELETE FROM brands WHERE brandId = '${brandIdToDelete}'`;
      await dal.execute(sql);
}

export default {
      getAllBrands,
      getOneBrand,
      addNewBrand,
      updateBrand,
      deleteBrand
}
