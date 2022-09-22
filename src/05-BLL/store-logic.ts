import { BrandModel } from "../03-Models/brand-model";
import { PhoneModel } from "../03-Models/phone-model";
import dal from "../04-DAL/dal";

async function getAllPhones(): Promise<PhoneModel[]>{
      const sql = "SELECT * FROM phones";
      const phones = await dal.execute(sql);
      return phones;
};

async function getAllBrands(): Promise<BrandModel[]>{
      const sql = "SELECT * FROM brands";
      const brands = await dal.execute(sql);
      return brands;
}

export default {
      getAllPhones,
      getAllBrands
}