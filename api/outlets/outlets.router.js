const {
  getOutletsBySalesID,
  getVolumeByOutletID,
  getOutletsNearby,
  getOutletByOutletID,
  getOutletsMapBySalesID,
  getOutletTypeStatus,
  getOutletAll,
  updateOutletDetail,
} = require("./outlets.controller");

const routerOutlet = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

routerOutlet.get(
  "/getOutletsBySalesID/:userId",
  checkToken,
  getOutletsBySalesID
);
routerOutlet.get(
  "/getVolumeByOutletID/:getVolumeByOutletID",
  checkToken,
  getVolumeByOutletID
);
routerOutlet.get(
  "/getOutletByOutletID/:outletid",
  checkToken,
  getOutletByOutletID
);
routerOutlet.post("/getOutletsNearby/", checkToken, getOutletsNearby);
routerOutlet.get(
  "/getOutletsMapBySalesID/:userId",
  checkToken,
  getOutletsMapBySalesID
);
// new
routerOutlet.post("/getOutletTypeStatus", checkToken, getOutletTypeStatus);
routerOutlet.post("/getOutletAll", checkToken, getOutletAll);
routerOutlet.post("/updateOutletDetail", updateOutletDetail);

module.exports = routerOutlet;
