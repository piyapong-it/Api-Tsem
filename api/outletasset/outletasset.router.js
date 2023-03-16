const { 
    updateAsset,
    getAssetMaster,
 } = require("./outletasset.controller");
 
 const routerAsset = require("express").Router();
 const { checkToken } = require("../../auth/token_validation");
 
 routerAsset.get("/getAssetMaster/", checkToken, getAssetMaster);
 routerAsset.post("/updateAsset/", checkToken, updateAsset);
 
 module.exports = routerAsset;