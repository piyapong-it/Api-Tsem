const { 
    getUDC,
    getSalesFolder,
    getDefectTrans,
    updateDefect,
    getTaskTrans,
    getMyTaskTrans,
    updateTask,
    updateOutletImage,
    getCPQuestion,
    getComplaintTrans,
    getComplaintQuiz,
    updateComplaintTrans,
    updateComplaintQuiz
} = require("./miscellaneous.service");

module.exports={
    getUDC:(req, res) => {
        const id = req.query.id;
        const md = req.query.md;
        const key = req.query.key;
        getUDC(id,md,key, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(JSON.stringify({ success: false, message: err,result:[] }));
            }
            if (results.recordset.length == 0){
                return res.status(200).send(JSON.stringify({ success: true, message: "Record not found",result:[] }));
            }            
            return  res.send(JSON.stringify({ success: true, message: "Total Record is " + results.recordset.length, result: results.recordset }));
        });
    },
    getSalesFolder:(req, res) => {
        getSalesFolder(req ,(err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(JSON.stringify({ success: false, message: err,result:[] }));
            }
            if (results.rowsAffected == 0){
                return res.status(200).send(JSON.stringify({ success: true, message: "Record not found",result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: "Total Record is " + results.recordset.length, result: results.recordset }));
        });
    },
    getDefectTrans:(req, res) => {
        const outletid = req.query.outletid;
        const defectid = req.query.defectid;
        getDefectTrans(outletid,defectid,(err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(JSON.stringify({ success: false, message: err,result:[] }));
            }
            if (results.rowsAffected == 0){
                return res.status(200).send(JSON.stringify({ success: true, message: "Record not found",result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: "Total Record is " + results.recordset.length, result: results.recordset }));
        });
    },
    updateDefect: (req, res) => {
        const body = req.body;
        updateDefect(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(JSON.stringify({ success: false, message: err.message,result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: results.recordset[0].RetMessage, result: []}));
        });
    },
    getTaskTrans:(req, res) => {
        const outletid = req.query.outletid;
        const taskid = req.query.taskid;
        getTaskTrans(outletid,taskid,(err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(JSON.stringify({ success: false, message: err,result:[] }));
            }
            if (results.rowsAffected == 0){
                return res.status(200).send(JSON.stringify({ success: true, message: "Record not found",result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: "Total Record is " + results.recordset.length, result: results.recordset }));
        });
    },
    getMyTaskTrans:(req, res) => {
        const salesid = req.query.salesid;
        const taskstatus = req.query.taskstatus;
        getMyTaskTrans(salesid,taskstatus,(err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(JSON.stringify({ success: false, message: err,result:[] }));
            }
            if (results.rowsAffected == 0){
                return res.status(200).send(JSON.stringify({ success: true, message: "Record not found",result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: "Total Record is " + results.recordset.length, result: results.recordset }));
        });
    },
    updateTask: (req, res) => {
        const body = req.body;
        updateTask(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(JSON.stringify({ success: false, message: err.message,result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: results.recordset[0].RetMessage, result: []}));
        });
    },
    updateOutletImage: (req, res) => {
        const body = req.body;
        updateOutletImage(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(JSON.stringify({ success: false, message: err.message,result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: results.recordset[0].RetMessage, result: []}));
        });
    },
    getCPQuestion:(req, res) => {
        const category = req.query.category;
        getCPQuestion(category,(err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(JSON.stringify({ success: false, message: err,result:[] }));
            }
            if (results.rowsAffected == 0){
                return res.status(200).send(JSON.stringify({ success: true, message: "Record not found",result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: "Total Record is " + results.recordset.length, result: results.recordset }));
        });
    },
    getComplaintTrans:(req, res) => {
        const outletid = req.query.outletid;
        const complaintid = req.query.complaintid;
        getComplaintTrans(outletid,complaintid,(err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(JSON.stringify({ success: false, message: err,result:[] }));
            }
            if (results.rowsAffected == 0){
                return res.status(200).send(JSON.stringify({ success: true, message: "Record not found",result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: "Total Record is " + results.recordset.length, result: results.recordset }));
        });
    },
    getComplaintQuiz:(req, res) => {
        const complaintid = req.query.complaintid;
        getComplaintQuiz(complaintid,(err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(JSON.stringify({ success: false, message: err,result:[] }));
            }
            if (results.rowsAffected == 0){
                return res.status(200).send(JSON.stringify({ success: true, message: "Record not found",result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: "Total Record is " + results.recordset.length, result: results.recordset }));
        });
    },
    updateComplaintTrans: (req, res) => {
        const body = req.body;
        updateComplaintTrans(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(JSON.stringify({ success: false, message: err.message,result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: results.recordset[0].RetMessage, result: []}));
        });
    },
    updateComplaintQuiz: (req, res) => {
        const body = req.body;
        updateComplaintQuiz(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(JSON.stringify({ success: false, message: err.message,result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: results.recordset[0].RetMessage, result: []}));
        });
    },
}