import mysql, { MysqlError } from "mysql";

const connection = mysql.createPool({
      host: "us-cdbr-east-06.cleardb.net",
      user: "b181279c4a681c",
      password: "e2407fd7",
      database: "heroku_8067d5c6d1b7b6e"
});
function execute(sql: string): Promise<any> {
      return new Promise((resolve, reject) => {
            connection.query(sql, (err: MysqlError, result: any) => {
                  if (err) {
                        reject(err)
                        return
                  }
                  resolve(result);
            });
      });
};


export default {
      execute
}