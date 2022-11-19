import { PhoneModel } from "../03-Models/phone-model";
import dal from "../04-DAL/dal";
import { v4 as uuid } from "uuid";


async function getAllPhones(): Promise<PhoneModel[]> {
      const sql = "SELECT * FROM phones";
      const phones = await dal.execute(sql);
      return phones;
};

async function getOnePhoneByPhoneId(phoneId: string): Promise<PhoneModel> {
      const sql = `SELECT * FROM phones WHERE phoneId = '${phoneId}'`;
      const phones = await dal.execute(sql);
      const phone = phones[0];
      return phone;
}

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

async function updatePhone(phoneToUpdate: PhoneModel): Promise<PhoneModel>{
      const sql = `UPDATE phones SET brandId = '${phoneToUpdate.brandId}',name ='${phoneToUpdate.name}',description = '${phoneToUpdate.description}',price ='${phoneToUpdate.price}',picture='${phoneToUpdate.picture}'`;
      const updatedPhone = await dal.execute(sql);
      return updatedPhone;
}

async function deletePhone(phoneIdToDelete: string): Promise<void>{
      const sql = `DELETE FROM phones WHERE phoneId = '${phoneIdToDelete}'`;
      await dal.execute(sql);
}

export default {
      getAllPhones,
      getOnePhoneByPhoneId,
      getPhonesByBrandId,
      addNewPhone,
      updatePhone,
      deletePhone
}