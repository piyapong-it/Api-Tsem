const { poolPromise, sql } = require("../../config/database");

module.exports = {
    getProductMaster: async (own, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('Own', sql.NVarChar, own)
            .query(`EXEC [spGetProductMaster] @P_OWN = @Own;`
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
    getProductByVisitId: async (own,visitid, callBack) => {
        console.log(own, 'own')
        console.log(visitid, 'visitid')
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('Own', sql.NVarChar, own)
            .input('VisitId', sql.NVarChar, visitid)
            .query(`EXEC [spGetProductByVisitID] @P_OWN = @Own,@P_VisitId = @VisitId;`
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
}