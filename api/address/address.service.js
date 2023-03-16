const { poolPromise, sql } = require("../../config/database");

module.exports = {
  getProvince: async (callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool.request().query(
      `SELECT *
                    FROM [CM#PROVINCE]`,
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  getDistrict: async (province, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("province", sql.NVarChar, province)
      .query(
        `SELECT *
                    FROM [CM#DISTRICT] 
                    WHERE CM#PROVINCE_ID = @province `,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }

          return callBack(null, results);
        }
      );
  },
  getsubDistrict: async (dictrict, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("dictrict", sql.NVarChar, dictrict)
      .query(
        `SELECT *
                    FROM [CM#SUBDISTRICT]
                    WHERE CM#DISTRICT_ID = @dictrict `,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }

          return callBack(null, results);
        }
      );
  },
};
