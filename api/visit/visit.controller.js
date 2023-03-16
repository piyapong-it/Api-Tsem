const { 
    createVisit,
    getVisitAgenda,
    getVisitEOE,
    getVisitMjp,
    getVisitCallCard,
    getVisitCount,
    getVisit,
    updateVisit,
    updateVisitEOE,
    updateVisitAgenda,
    updateVisitCallCard,
    deleteVisitCallCard
} = require("./visit.service");

module.exports={
    insertVisit: (req, res) => {
        const body = req.body;
        createVisit(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(JSON.stringify({ success: false, message: err.message,result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: results.recordset[0].RetMessage, result: []}));
        });
    },
    getVisitAgenda: (req, res) => {
        const body = req.body;
        getVisitAgenda(body, (err, results) => {
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
    getVisitEOE: (req, res) => {
        const body = req.body;
        getVisitEOE(body, (err, results) => {
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
    getVisitMjp:(req, res) => {
        const jdeCode = req.params.jdeCode;
        getVisitMjp(jdeCode, (err, results) => {
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
    getVisitCallCard:(req, res) => {
        const visitid = req.query.visitid;
        getVisitCallCard(visitid, (err, results) => {
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
    getVisitCount:(req, res) => {
        const jdeCode = req.params.jdeCode;
        getVisitCount(jdeCode, (err, results) => {
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
    getVisit:(req, res) => {
        const outletId = req.params.outletId;
        getVisit(outletId, (err, results) => {
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
    updateVisit: (req, res) => {
        const body = req.body;
        updateVisit(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(JSON.stringify({ success: false, message: err.message,result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: results.recordset[0].RetMessage, result: []}));
        });
    },
    updateVisitAgenda: (req, res) => {
        const body = req.body;
        updateVisitAgenda(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(JSON.stringify({ success: false, message: err.message,result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: results.recordset[0].RetMessage, result: []}));
        });
    },
    updateVisitEoE: (req, res) => {
        const body = req.body;
        updateVisitEOE(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(JSON.stringify({ success: false, message: err.message,result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: results.recordset[0].RetMessage, result: []}));
        });
    },
    updateVisitCallCard: (req, res) => {
        const body = req.body;
        updateVisitCallCard(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(JSON.stringify({ success: false, message: err.message,result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: results.recordset[0].RetMessage, result: []}));
        });
    },
    deleteVisitCallCard: (req, res) => {
        const body = req.body;
        deleteVisitCallCard(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(JSON.stringify({ success: false, message: err.message,result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: results.recordset[0].RetMessage, result: []}));
        });
    },
}