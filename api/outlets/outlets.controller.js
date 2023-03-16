const {
  getOutletsBySalesID,
  getVolumeByOutletID,
  getOutletsNearby,
  getOutletByOutletID,
  getOutletsMapBySalesID,
  getOutletTypeStatus,
  getOutletAll,
  updateOutletDetail
} = require("./outlets.service");

module.exports = {
  getOutletsBySalesID: (req, res) => {
    const userId = req.params.userId;
    getOutletsBySalesID(userId, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send(JSON.stringify({ success: false, message: err, result: [] }));
      }
      if (results.recordset.length == 0) {
        return res
          .status(200)
          .send(
            JSON.stringify({
              success: true,
              message: "Record not found",
              result: [],
            })
          );
      }
      return res.send(
        JSON.stringify({
          success: true,
          message: "Total Record is " + results.recordset.length,
          result: results.recordset,
        })
      );
    });
  },
  getVolumeByOutletID: (req, res) => {
    const outletId = req.params.getVolumeByOutletID;
    getVolumeByOutletID(outletId, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send(JSON.stringify({ success: false, message: err, result: [] }));
      }
      if (results.recordset.length == 0) {
        return res
          .status(200)
          .send(
            JSON.stringify({
              success: true,
              message: "Record not found",
              result: [],
            })
          );
      }
      return res.send(
        JSON.stringify({
          success: true,
          message: "Total Record is " + results.recordset.length,
          result: results.recordset,
        })
      );
    });
  },
  getOutletsNearby: (req, res) => {
    const body = req.body;
    getOutletsNearby(body, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send(JSON.stringify({ success: false, message: err, result: [] }));
      }
      if (results.recordset.length == 0) {
        return res
          .status(200)
          .send(
            JSON.stringify({
              success: true,
              message: "Record not found",
              result: [],
            })
          );
      }
      return res.send(
        JSON.stringify({
          success: true,
          message: "Total Record is " + results.recordset.length,
          result: results.recordset,
        })
      );
    });
  },
  getOutletByOutletID: (req, res) => {
    const outletId = req.params.outletid;
    getOutletByOutletID(outletId, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send(JSON.stringify({ success: false, message: err, result: [] }));
      }
      if (results.recordset.length == 0) {
        return res
          .status(200)
          .send(
            JSON.stringify({
              success: true,
              message: "Record not found",
              result: [],
            })
          );
      }
      return res.send(
        JSON.stringify({
          success: true,
          message: "Total Record is " + results.recordset.length,
          result: results.recordset,
        })
      );
    });
  },
  getOutletsMapBySalesID: (req, res) => {
    const userId = req.params.userId;
    getOutletsMapBySalesID(userId, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send(JSON.stringify({ success: false, message: err, result: [] }));
      }
      if (results.recordset.length == 0) {
        return res
          .status(200)
          .send(
            JSON.stringify({
              success: true,
              message: "Record not found",
              result: [],
            })
          );
      }
      return res.send(
        JSON.stringify({
          success: true,
          message: "Total Record is " + results.recordset.length,
          result: results.recordset,
        })
      );
    });
  },
  //new
  getOutletTypeStatus: (req, res) => {
    const body = req.body;
    getOutletTypeStatus(body, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send(JSON.stringify({ success: false, message: err, result: [] }));
      }
      if (results.recordset.length == 0) {
        return res
          .status(200)
          .send(
            JSON.stringify({
              success: true,
              message: "Record not found",
              result: [],
            })
          );
      }
      return res.send(
        JSON.stringify({
          success: true,
          message: "Total Record is " + results.recordset.length,
          result: results.recordset,
        })
      );
    });
  },

  getOutletAll: (req, res) => {
    getOutletAll((err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send(JSON.stringify({ success: false, message: err, result: [] }));
      }
      if (results.recordset.length == 0) {
        return res
          .status(200)
          .send(
            JSON.stringify({
              success: true,
              message: "Record not found",
              result: [],
            })
          );
      }
      return res.send(
        JSON.stringify({
          success: true,
          message: "Total Record is " + results.recordset.length,
          result: results.recordset,
        })
      );
    });
  },

  updateOutletDetail: (req, res) => {
    const body = req.body;
    updateOutletDetail(body, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send(JSON.stringify({ success: false, message: err, result: [] }));
      }
      if (results.recordset.length == 0) {
        return res
          .status(200)
          .send(
            JSON.stringify({
              success: true,
              message: "Record not found",
              result: [],
            })
          );
      }
      return res.send(
        JSON.stringify({
          success: true,
          message: "Total Record is " + results.recordset.length,
          result: results.recordset,
        })
      );
    });
  },
};
