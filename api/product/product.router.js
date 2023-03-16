const { 
    getProductMaster,
    getProductByVisitId,
 } = require("./product.controller");
 
 const routerProduct = require("express").Router();
 const { checkToken } = require("../../auth/token_validation");
 
 routerProduct.get("/getProductMaster/", checkToken, getProductMaster);
 routerProduct.get("/getProductByVisitId/", checkToken, getProductByVisitId);
 
 module.exports = routerProduct;