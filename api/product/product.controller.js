const { 
    getProductMaster,
    getProductByVisitId,
} = require("./product.service");

module.exports={
    getProductMaster:(req, res) => {
        const own = req.query.own;
        getProductMaster(own, (err, results) => {
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
    getProductByVisitId:(req, res) => {
        const own = req.query.own;
        const visitid = req.query.visitid;
        getProductByVisitId(own,visitid, (err, results) => {
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
}