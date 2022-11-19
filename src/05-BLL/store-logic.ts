import dal from "../04-DAL/dal";

async function getTopThreeProducts(): Promise<string[]> {
      const sql = 'SELECT * FROM top_phones';
      const topThree = await dal.execute(sql);
      return topThree;
};

async function updateTopThree(phoneIdToUpdate: string): Promise<string[]> {
      const sql = `UPDATE top_three SET phoneId = '${phoneIdToUpdate}' WHERE phoneId = '${phoneIdToUpdate}'`;
      const updatedTopThree = await dal.execute(sql);
      return updatedTopThree;
}

async function getTopBrands(): Promise<string[]> {
      const sql = 'SELECT * FROM top_brands';
      const topBrands = await dal.execute(sql);
      return topBrands
}


export default {
      getTopThreeProducts,
      updateTopThree,
      getTopBrands
}