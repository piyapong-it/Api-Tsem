const { poolPromise, sql } = require("../../config/database");

module.exports = {
    getUDC: async (id,md,key, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('SysId', sql.VarChar, id)
            .input('SysMd', sql.VarChar, md)
            .input('UdcKey', sql.VarChar, key)
            .input('Host', sql.VarChar, process.env.APP_HOST)
            .input('Port', sql.VarChar, process.env.APP_PORT)
            .query(`EXEC [spGetUDC]
                        @Sys_Id = @SysId,
                        @Sys_Md = @SysMd,
                        @Udc_Key = @UdcKey,
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
    getSalesFolder: async (req,callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('Host', sql.VarChar, process.env.APP_HOST)
            .input('Port', sql.VarChar, process.env.APP_PORT)
            .query(`EXEC [spGetSalesFolder]
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
    getDefectTrans: async (outletid,defectid, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('OutletId', sql.NVarChar, outletid)
            .input('DefectId', sql.NVarChar, defectid)
            .input('Host', sql.VarChar, process.env.APP_HOST)
            .input('Port', sql.VarChar, process.env.APP_PORT)
            .query(`EXEC [spGetDefectTrans]
                    @P_OutletID = @OutletId,
                    @P_DefectID = @DefectId,
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
    updateDefect:async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('DefectId', sql.NVarChar(10), data.defectid)
            .input('OutletId', sql.NVarChar(30), data.outletid)
            .input('DefectCategory', sql.NVarChar(10), data.defectcategory)
            .input('DefectStatus', sql.NVarChar(10), data.defectstatus)
            .input('PmId', sql.Numeric(38,0), data.pmid)
            .input('BatchCode',sql.Date,data.batchcode)
            .input('DefectImage', sql.NVarChar(250), data.defectimage)
            .input('DefectRemark', sql.NVarChar(250), data.defectremark)
            .input('UpdateBy', sql.NVarChar(10), data.updateby)

            .query(`DECLARE	@RetMessage varchar(50)
                    EXEC [dbo].[spUpdateDefect]
                        @DefectId = @DefectId,
                        @OutletId = @OutletId,
                        @DefectCategory = @DefectCategory,
                        @DefectStatus = @DefectStatus,
                        @PmId = @PmId,
                        @BatchCode = @BatchCode,
                        @DefectImage = @DefectImage,
                        @DefectRemark = @DefectRemark,
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
    getMyTaskTrans: async (salesid,taskstatus, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('SalesId', sql.NVarChar, salesid)
            .input('TaskStatus', sql.NVarChar, taskstatus)
            .input('Host', sql.VarChar, process.env.APP_HOST)
            .input('Port', sql.VarChar, process.env.APP_PORT)
            .query(`EXEC [spGetMyTaskTrans]
                    @P_SALEXCD = @SalesId,
                    @P_TaskStatus = @TaskStatus,
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
    getTaskTrans: async (outletid,taskid, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('OutletId', sql.NVarChar, outletid)
            .input('TaskId', sql.NVarChar, taskid)
            .input('Host', sql.VarChar, process.env.APP_HOST)
            .input('Port', sql.VarChar, process.env.APP_PORT)
            .query(`EXEC [spGetTaskTrans]
                    @P_OutletID = @OutletId,
                    @P_TaskID = @TaskId,
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
    updateTask:async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('TaskId', sql.NVarChar(10), data.taskid)
            .input('OutletId', sql.NVarChar(30), data.outletid)
            .input('TaskCategory', sql.NVarChar(10), data.taskcategory)
            .input('TaskStatus', sql.NVarChar(10), data.taskstatus)
            .input('TaskImage', sql.NVarChar(250), data.taskimage)
            .input('DueDate', sql.Date, data.duedate)
            .input('CompleteDate', sql.Date, data.completedate)
            .input('TaskRemark', sql.NVarChar(250), data.taskremark)
            .input('UpdateBy', sql.NVarChar(30), data.updateby)

            .query(`DECLARE	@RetMessage varchar(50)
                    EXEC [dbo].[spUpdateTask]
                        @TaskId = @TaskId,
                        @OutletId = @OutletId,
                        @TaskCategory = @TaskCategory,
                        @TaskStatus = @TaskStatus,
                        @TaskImage = @TaskImage,
                        @DueDate = @DueDate,
                        @CompleteDate = @CompleteDate,
                        @TaskRemark = @TaskRemark,
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
    updateOutletImage:async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('OutletId', sql.NVarChar(30), data.outletid)
            .input('ImagePath', sql.NVarChar(250), data.imagepath)
            .query(`DECLARE	@RetMessage varchar(50)
                    EXEC [dbo].[spUpdateOutletImage]
                        @OutletId = @OutletId,
                        @ImagePath = @ImagePath,
                        @RetValue = @RetMessage OUTPUT
            
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
    getCPQuestion: async (category, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('Category', sql.NVarChar, category)
            .query(`EXEC [spGetCPQuestion]
                    @P_CATEGORY = @Category;`
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
    getComplaintTrans: async (outletid,complaintid, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('OutletId', sql.NVarChar, outletid)
            .input('ComplaintId', sql.NVarChar, complaintid)
            .input('Host', sql.VarChar, process.env.APP_HOST)
            .input('Port', sql.VarChar, process.env.APP_PORT)
            .query(`EXEC [spGetComplaintTrans]
                    @P_OutletID = @OutletId,
                    @P_COMPLAINTID = @ComplaintId,
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
    getComplaintQuiz: async (complaintid, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('ComplaintId', sql.NVarChar, complaintid)
            .query(`EXEC [spGetComplaintQuiz]
                    @P_COMPLAINTID = @ComplaintId;`
                , (error, results, fields) => {
                    if (error) {
                        return callBack(error)
                    }
                    return callBack(null, results)
                }
            );
    },
    updateComplaintTrans:async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('ComplaintId', sql.NVarChar(10), data.complaintid)
            .input('OutletId', sql.NVarChar(30), data.outletid)
            .input('ComplaintDate', sql.Date, data.complaintdate)
            .input('ComplaintStatus', sql.NVarChar(10), data.complaintstatus)
            .input('PmId', sql.Numeric(38,0), data.pmid)
            .input('Image1', sql.NVarChar(250), data.image1)
            .input('Image2', sql.NVarChar(250), data.image2)
            .input('Image3', sql.NVarChar(250), data.image3)
            .input('Image4', sql.NVarChar(250), data.image4)
            .input('Quantity', sql.Numeric(38,0), data.quantity)
            .input('Remark', sql.NVarChar(250), data.remark)
            .input('FinishText', sql.NVarChar(250), data.finishtext)
            .input('UpdateBy', sql.NVarChar(10), data.updateby)

            .query(`DECLARE	@RetMessage varchar(50)
                    EXEC [dbo].[spUpdateComplaintTrans]
                        @ComplaintId = @ComplaintId,
                        @OutletId = @OutletId,
                        @ComplaintDate = @ComplaintDate,
                        @ComplaintStatus = @ComplaintStatus,
                        @PmId  = @PmId,
                        @Image1 = @Image1,
                        @Image2 = @Image2,
                        @Image3 = @Image3,
                        @Image4 = @Image4,
                        @Quantity = @Quantity,
                        @Remark = @Remark,
                        @FinishText = @FinishText,
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
    updateComplaintQuiz:async (data, callBack) => {
        const pool = await poolPromise
        const queryResult = await pool.request()
            .input('QuizId', sql.Int, data.quizid)
            .input('ComplaintId', sql.Int, data.complaintid)
            .input('QuestionId', sql.Int, data.questionid)
            .input('QuestionSeq', sql.Int, data.questionseq)
            .input('QuestionText', sql.NVarChar(250), data.questiontext)
            .input('QuestionCategory', sql.NVarChar(250), data.questioncategory)
            .input('AnswerId', sql.Int, data.answerid)
            .input('AnswerText', sql.NVarChar(250), data.answertext)
            .input('FinishText', sql.NVarChar(250), data.finishtext)
            .input('UpdateBy', sql.NVarChar(10), data.updateby)

            .query(`DECLARE	@RetMessage varchar(50)
                    EXEC [dbo].[spUpdateComplaintQuiz]
                        @QuizId = @QuizId,
                        @ComplaintId = @ComplaintId,
                        @QuestionId = @QuestionId,
                        @QuestionSeq = @QuestionSeq,
                        @QuestionText = @QuestionText,
                        @QuestionCategory  = @QuestionCategory,
                        @AnswerId = @AnswerId,
                        @AnswerText = @AnswerText,
                        @FinishText = @FinishText,
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
