const { poolPromise, sql } = require("../../config/database");

module.exports = {
  getOutletsBySalesID: async (userId, callBack) => {
    const pool = await poolPromise;
    //console.log(`salesx Cd ${userId}`);
    //console.log('salesx Cd ${userId}');
    const queryResult = await pool
      .request()
      .input("SalexCd", sql.VarChar, userId)
      .input("Host", sql.VarChar, process.env.APP_HOST)
      .input("Port", sql.VarChar, process.env.APP_PORT)
      .query(
        "Exec spGetOutletListBySaleCode @P_SALEXCD = @SalexCd,@P_HOST = @Host,@P_PORT = @Port;",
        (error, results, fieds) => {
          if (error) {
            console.log("error");
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
  getVolumeByOutletID: async (outletId, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("OutletID", sql.VarChar, outletId)
      .query(
        "Exec spGetOutletVolume15MonthByCategory @P_OUTLETKEY = @OutletID;",
        (error, results, fields) => {
          if (error) {
            console.log("error");
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
  getOutletsNearby: async (data, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("lat", sql.Float, data.lat)
      .input("lng", sql.Float, data.lng)
      .input("km", sql.Float, data.km)
      .query(
        "Exec spGetOutletNearBy @P_lat = @lat,@P_lng = @lng,@P_km = @km;",
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
  getOutletByOutletID: async (outletId, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("OutletID", sql.VarChar, outletId)
      .input("Host", sql.VarChar, process.env.APP_HOST)
      .input("Port", sql.VarChar, process.env.APP_PORT)
      .query(
        `Exec spGetOutletById 
                        @P_OutletID = @OutletID, 
                        @P_HOST = @Host,
                        @P_PORT = @Port ;`,
        (error, results, fields) => {
          if (error) {
            console.log("error");
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
  getOutletsMapBySalesID: async (userId, callBack) => {
    const pool = await poolPromise;
    //console.log(`salesx Cd ${userId}`);
    //console.log('salesx Cd ${userId}');
    const queryResult = await pool
      .request()
      .input("SalexCd", sql.VarChar, userId)
      .input("Host", sql.VarChar, process.env.APP_HOST)
      .input("Port", sql.VarChar, process.env.APP_PORT)
      .query(
        "Exec spGetOutletMapBySaleCode @P_SALEXCD = @SalexCd,@P_HOST = @Host,@P_PORT = @Port;",
        (error, results, fieds) => {
          if (error) {
            console.log("error");
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
  getOutletTypeStatus: async (data, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("Sys_Id", sql.VarChar, data.Sys_Id)
      .input("Sys_Md", sql.VarChar, data.Sys_Md)
      .input("Sys_Enbled", sql.VarChar, data.Sys_Enbled)
      .query(
        "Exec spGetOutletTypeStatus @Sys_Id = @Sys_Id ,@Sys_Md = @Sys_Md , @Udc_enabled = @Sys_Enbled;",
        (error, results, fieds) => {
          if (error) {
            console.log("error");
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
  getOutletAll: async (callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool.request().query(
      `SELECT [CM#OUTL_KEY]
              ,[CM#OUTL_ID]
              ,[CM#OUTL_NAME]
              FROM [CM#OUTL]
              WHERE CM#OUTL_CATE IN ('D', 'S') `,
      (error, results, fieds) => {
        if (error) {
          console.log("error");
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateOutletDetail: async (data, callBack) => {
    console.log("data", data);
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("lat", sql.NVarChar, data.lat)
      .input("long", sql.NVarChar, data.long)
      .input("buyfrom1", sql.NVarChar, data.buyfrom1)
      .input("buyfrom2", sql.NVarChar, data.buyfrom2)
      .input("status", sql.NVarChar, data.status)
      .input("outlEnabled", sql.NVarChar, data.outlEnabled)
      .input("outlTel", sql.NVarChar, data.outlTel)
      .input("outlMobile", sql.NVarChar, data.outlMobile)
      .input("type", sql.NVarChar, data.type)
      .input("typeDesc", sql.NVarChar, data.typeDesc)
      .input("provinceID", sql.NVarChar, data.provinceID)
      .input("outlZipcode", sql.NVarChar, data.outlZipcode)
      .input("address", sql.NVarChar, data.address)
      .input("amphur", sql.NVarChar, data.amphur)
      .input("tumbon", sql.NVarChar, data.tumbon)
      .input("outlId", sql.NVarChar, data.outlId)
      .input("UpdateBy", sql.NVarChar, data.UpdateBy)
      .query(
        `DECLARE	@RetMessage nvarchar(100)
        Exec spUpdateOutl @lat = @lat , @long = @long , @buyfrom1 = @buyfrom1 ,
        @buyfrom2 = @buyfrom2 , @status = @status,  @outlEnabled= @outlEnabled , @outlTel = @outlTel ,
        @outlMobile = @outlMobile, @type = @type, @typeDesc = @typeDesc, @provinceID = @provinceID,
        @outlZipcode = @outlZipcode, @address = @address, @amphur= @amphur, @tumbon = @tumbon, @outlId = @outlId,
        @UpdateBy= @UpdateBy, @RetMessage = @RetMessage OUTPUT SELECT	@RetMessage as N'RetMessage' ;`,
        (error, results, fieds) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
};
