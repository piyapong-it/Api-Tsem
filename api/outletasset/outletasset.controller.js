const { 
    getAssetMaster,
    updateAsset
} = require("./outletasset.service");

module.exports={
    updateAsset: (req, res) => {
        const body = req.body;
        updateAsset(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(JSON.stringify({ success: false, message: err.message,result:[] }));
            }
            return  res.send(JSON.stringify({ success: true, message: results.recordset[0].RetMessage, result: []}));
        });
    },
    getAssetMaster:(req, res) => {
        const outletid = req.query.outletid;
        const qrid = req.query.qrid;

        getAssetMaster(outletid,qrid, (err, results) => {
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