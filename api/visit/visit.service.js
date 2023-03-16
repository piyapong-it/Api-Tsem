const { poolPromise, sql } = require("../../config/database");

module.exports = {
    createVisit:async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('OutletId', sql.NVarChar(30), data.outletid)
            .input('VisitDate', sql.NVarChar, data.visitdate)
            .input('JdeCode', sql.NVarChar(10), data.jdecode)
            .input('Lat', sql.NVarChar(30), data.lat)
            .input('Lng', sql.NVarChar(30), data.lng)
            .query(`DECLARE	@RetMessage varchar(50)
                    EXEC	[dbo].[spInsertVisit]
                    @OutletID = @OutletId,
                    @VisitDate = @VisitDate,
                    @JdeCode = @JdeCode,
                    @Lat = @Lat,
                    @Lng = @Lng,
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
    getVisitAgenda: async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('OutletId', sql.NVarChar, data.outletid)
            .input('VisitDate', sql.NVarChar, data.visitdate)
            .query('Exec spGetVisitAgenda @P_OutletID = @OutletId,@P_VisitDate = @VisitDate;'
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
    getVisitEOE: async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('OutletId', sql.NVarChar, data.outletid)
            .input('VisitDate', sql.NVarChar, data.visitdate)
            .input('Group', sql.NVarChar, data.group)
            .input('Host', sql.VarChar, process.env.APP_HOST)
            .input('Port', sql.VarChar, process.env.APP_PORT)
            .query(`EXEC [spGetVisitEOE]
                    @P_OutletID = @OutletId,
                    @P_VisitDate = @VisitDate,
                    @P_Group = @Group,
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
    getVisitMjp: async (jdeCode, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('JdeCode', sql.NVarChar, jdeCode)
            .input('Host', sql.VarChar, process.env.APP_HOST)
            .input('Port', sql.VarChar, process.env.APP_PORT)
            .query(`EXEC [spGetVisitMJP] @P_JDECD = @JdeCode,@P_HOST = @Host,@P_PORT = @Port;`
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
    getVisitCallCard: async (visitid, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('VisitId', sql.NVarChar, visitid)
            .input('Host', sql.VarChar, process.env.APP_HOST)
            .input('Port', sql.VarChar, process.env.APP_PORT)
            .query(`EXEC [spGetVisitCallCard] @P_VisitId = @VisitId,@P_HOST = @Host,@P_PORT = @Port;`
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
    getVisitCount: async (jdeCode, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('JdeCode', sql.NVarChar, jdeCode)
            .query(`EXEC [spGetVisitCount] @P_JDECD = @JdeCode;`
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
    getVisit: async (outletId, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('OutletId', sql.NVarChar, outletId)
            .query(`EXEC [spGetVisit] @P_OutletId = @OutletId;`
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
    updateVisit: async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('VisitID', sql.NVarChar, data.visitid)
            .input('VisitStatus', sql.NVarChar, data.visitstatus)
            .input('UpdateBy', sql.NVarChar(30), data.updateby)
            .query(`DECLARE	@RetMessage varchar(50)
                    EXEC	[dbo].[spUpdateVisit]
                    @VisitID = @VisitID,
                    @VisitStatus = @VisitStatus,
                    @UpdateBy = @UpdateBy,
                    @RetMessage = @RetMessage OUTPUT
            
                    SELECT	@RetMessage as N'RetMessage' ;`
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
    updateVisitEOE: async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('VisitID', sql.NVarChar, data.visitid)
            .input('AgendaId', sql.Int, data.agendaid)
            .input('EoEseq', sql.Numeric, data.eoeseq)
            .input('EoEflag', sql.NChar, data.eoeflag)
            .query(`DECLARE	@RetMessage varchar(50)
                    EXEC	[dbo].[spUpdateVisitEoE]
                    @VisitID = @VisitID,
                    @AgendaId = @AgendaId,
                    @EoEseq = @EoEseq,
                    @EoEflag = @EoEflag,
                    @RetMessage = @RetMessage OUTPUT
            
                    SELECT	@RetMessage as N'RetMessage' ;`
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
    updateVisitAgenda: async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('VisitID', sql.NVarChar, data.visitid)
            .input('AgendaId', sql.Int, data.agendaid)
            .input('VisitStatus', sql.NVarChar, data.visitstatus)
            .query(`DECLARE	@RetMessage varchar(50)
                    EXEC	[dbo].[spUpdateVisitAgenda]
                    @VisitID = @VisitID,
                    @AgendaId = @AgendaId,
                    @VisitStatus = @VisitStatus,
                    @RetMessage = @RetMessage OUTPUT
            
                    SELECT	@RetMessage as N'RetMessage' ;`
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
    updateVisitCallCard: async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('VisitID', sql.NVarChar, data.visitid)
            .input('AgendaId', sql.Int, data.agendaid)
            .input('PMId', sql.Numeric, data.pmid)
            .input('Premas', sql.Decimal(18,2), data.premas)
            .input('Mas', sql.Decimal(18,2), data.mas)
            .input('Price', sql.Decimal(18,2), data.price)
            .input('Stock', sql.Decimal(18,2), data.stock)
            .input('ProductDate', sql.Date, data.productdate)
            .input('UpdateBy', sql.NVarChar, data.updateby)
            .input('OutletId', sql.NVarChar, data.outletid)
            .input('VisitDate', sql.Date, data.visitdate)
            .query(`DECLARE	@RetMessage varchar(50)
                    EXEC	[dbo].[spUpdateVisitCallCard]
                    @VisitID = @VisitID,
                    @AgendaId = @AgendaId,
                    @PMId = @PMId,
                    @Premas = @Premas,
                    @Mas = @Mas,
                    @Price = @Price,
                    @Stock = @Stock,
                    @ProductDate = @ProductDate,
                    @UpdateBy = @UpdateBy,
                    @OutletId = @OutletId,
                    @VisitDate = @VisitDate,
                    @RetMessage = @RetMessage OUTPUT
            
                    SELECT	@RetMessage as N'RetMessage' ;`
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
    deleteVisitCallCard: async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('VisitID', sql.NVarChar, data.visitid)
            .input('AgendaId', sql.Int, data.agendaid)
            .input('PMId', sql.Numeric, data.pmid)
            .query(`DECLARE	@RetMessage varchar(50)
                    EXEC	[dbo].[spDeleteVisitCallCard]
                    @VisitID = @VisitID,
                    @AgendaId = @AgendaId,
                    @PMId = @PMId,
                    @RetMessage = @RetMessage OUTPUT
            
                    SELECT	@RetMessage as N'RetMessage' ;`
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
}