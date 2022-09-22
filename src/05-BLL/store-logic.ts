import { BrandModel } from "../03-Models/brand-model";
import { PhoneModel } from "../03-Models/phone-model";
import dal from "../04-DAL/dal";
import { v4 as uuid } from "uuid";

async function getAllPhones(): Promise<PhoneModel[]> {
      const sql = "SELECT * FROM phones";
      const phones = await dal.execute(sql);
      return phones;
};

async function getAllBrands(): Promise<BrandModel[]> {
      const sql = "SELECT * FROM brands";
      const brands = await dal.execute(sql);
      return brands;
};

async function getPhonesByBrandId(brandId: string): Promise<PhoneModel[]> {
      const sql = `SELECT * FROM phones WHERE brandId = '${brandId}'`;
      const phones = await dal.execute(sql);
      return phones;
}

async function addNewPhone(phone: PhoneModel): Promise<PhoneModel> {
      phone.phoneId = uuid();
      const sql = `INSERT INTO phones VALUES (
                                    '${phone.phoneId}',
                                    '${phone.brandId}',
                                    '${phone.name}',
                                    '${phone.description}',
                                    '${phone.rating}',
                                    '${phone.price}',
                                    '${phone.picture}')`;
      await dal.execute(sql);
      return phone;
};

async function addNewBrand(brand: BrandModel): Promise<BrandModel> {
      brand.brandId = uuid();
      const sql = `INSERT INTO brands VALUES (
                                          '${brand.brandId}',
                                          '${brand.brand}')`;
      await dal.execute(sql);
      console.log(brand);

      return brand;
}

export default {
      getAllPhones,
      getAllBrands,
      getPhonesByBrandId,
      addNewPhone,
      addNewBrand
}