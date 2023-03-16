const {
  getProvince,
  getDistrict,
  getsubDistrict,
} = require("./address.service");

module.exports = {
  getProvince: (req, res) => {
    getProvince((err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send(JSON.stringify({ success: false, message: err, result: [] }));
      }
      return res
        .status(200)
        .send(JSON.stringify({ success: true, result: results.recordset }));
    });
  },
  getDistrict: (req, res) => {
    const province = req.params.province;
    getDistrict(province, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send(JSON.stringify({ success: false, message: err, result: [] }));
      }
      return res
        .status(200)
        .send(JSON.stringify({ success: true, result: results.recordset }));
    });
  },
  getsubDistrict: (req, res) => {
    const district = req.params.district;
    getsubDistrict(district, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send(JSON.stringify({ success: false, message: err, result: [] }));
      }
      return res
        .status(200)
        .send(JSON.stringify({ success: true, result: results.recordset }));
    });
  },
};
