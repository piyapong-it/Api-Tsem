const { poolPromise, sql } = require("../../config/database");

module.exports = {
    getAssetMaster: async (outletid,qrid, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('OutletId', sql.NVarChar, outletid)
            .input('QrId', sql.NVarChar, qrid)
            .input('Host', sql.VarChar, process.env.APP_HOST)
            .input('Port', sql.VarChar, process.env.APP_PORT)
            .query(`EXEC [spGetAssetMaster]
                    @P_OutletID = @OutletId,
                    @P_STICKERID = @QrId,
                    @P_HOST = @Host,
                    @P_PORT = @Port ;`
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
    updateAsset:async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('StickerId', sql.NVarChar(10), data.stickerid)
            .input('OutletId', sql.NVarChar(30), data.outletid)
            .input('AssetCategory', sql.NVarChar(10), data.assetcategory)
            .input('AssetStatus', sql.NVarChar(10), data.assetstatus)
            .input('AssetSno', sql.NVarChar(50), data.assetsno)
            .input('AssetJdeNo', sql.Int, data.assetjdeno)
            .input('AssetRemark', sql.NVarChar(50), data.assetremark)
            .input('AssetQuantity', sql.Int, data.assetquantity)
            .input('UpdateBy', sql.NVarChar(30), data.updateby)

            .query(`DECLARE	@RetMessage varchar(50)
                    EXEC [dbo].[spUpdateAsset]
                        @Sticker_Id = @StickerId,
                        @OutletId = @OutletId,
                        @AssetCategory = @AssetCategory,
                        @AssetStatus = @AssetStatus,
                        @AssetSno = @AssetSno,
                        @AssetJdeNo = @AssetJdeNo,
                        @AssetRemark = @AssetRemark,
                        @AssetQuantity = @AssetQuantity,
                        @UpdateBy = @UpdateBy,
                        @RetMessage = @RetMessage OUTPUT
            
                    SELECT	@RetMessage as N'RetMessage' ;`
                , (error, results, fieds) => {
                    if (error) {
                        console.log("error");
                        return callBack(error);
                    }
                    return callBack(null, results);
                }
            );            
    },
}