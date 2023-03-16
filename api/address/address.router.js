const {
  getProvince,
  getDistrict,
  getsubDistrict,
} = require("./address.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/province", getProvince);
router.get("/:province/district", getDistrict);
router.get("/:district/subdistrict", getsubDistrict);

module.exports = router;
