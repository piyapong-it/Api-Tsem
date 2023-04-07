const { 
   insertVisit,
   getVisitAgenda,
   getVisitEOE,
   getVisitMjp,
   getVisitCallCard,
   getVisitCount,
   getVisit,
   updateVisit,
   updateVisitAgenda,
   updateVisitEoE,
   updateVisitCallCard,
   deleteVisitCallCard,
   deleteVisitEoE,
   insertVisitEoE,
   getVisitEoEAll
} = require("./visit.controller");

const routerVisit = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

routerVisit.get("/getVisitMjp/:jdeCode", checkToken, getVisitMjp);
routerVisit.get("/getVisitCallCard/", checkToken, getVisitCallCard);
routerVisit.get("/getVisitCount/:jdeCode", checkToken, getVisitCount);
routerVisit.get("/getVisit/:outletId", checkToken, getVisit);
routerVisit.post("/insertVisit/", checkToken, insertVisit);
routerVisit.post("/getVisitAgenda/", checkToken, getVisitAgenda);
routerVisit.post("/getVisitEOE/", checkToken, getVisitEOE);
routerVisit.post("/updateVisit/", checkToken, updateVisit);
routerVisit.post("/updateVisitAgenda/", checkToken, updateVisitAgenda);
routerVisit.post("/updateVisitEoE/", checkToken, updateVisitEoE);
routerVisit.post("/updateVisitCallCard/", checkToken, updateVisitCallCard);
routerVisit.post("/deleteVisitCallCard/", checkToken, deleteVisitCallCard);
// new routing
routerVisit.post("/getVisitEoEAll/", getVisitEoEAll);
routerVisit.post("/deleteVisitEoE/", deleteVisitEoE);
routerVisit.post("/insertVisitEoE/",  insertVisitEoE);

module.exports = routerVisit;