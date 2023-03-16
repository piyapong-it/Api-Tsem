const { 
    getUDC,
    getSalesFolder,
    getDefectTrans,
    updateDefect,
    getTaskTrans,
    getMyTaskTrans,
    updateTask,
    updateOutletImage,
    getCPQuestion,
    getComplaintTrans,
    getComplaintQuiz,
    updateComplaintTrans,
    updateComplaintQuiz
 } = require("./miscellaneous.controller");
 
 const routerMisc = require("express").Router();
 const { checkToken } = require("../../auth/token_validation");
 
 routerMisc.get("/getUDC/", checkToken, getUDC);
 routerMisc.get("/getSalesFolder/", checkToken, getSalesFolder);
 routerMisc.get("/getDefectTrans/", checkToken, getDefectTrans);
 routerMisc.post("/updateDefect/", checkToken, updateDefect);
 routerMisc.get("/getTaskTrans/", checkToken, getTaskTrans);
 routerMisc.get("/getMyTaskTrans/", checkToken, getMyTaskTrans);
 routerMisc.post("/updateTask/", checkToken, updateTask);
 routerMisc.post("/updateOutletImage/", checkToken, updateOutletImage);
 routerMisc.get("/getCPQuestion/", checkToken, getCPQuestion);
 routerMisc.get("/getComplaintTrans/", checkToken, getComplaintTrans);
 routerMisc.get("/getComplaintQuiz/", checkToken, getComplaintQuiz);
 routerMisc.post("/updateComplaintTrans/", checkToken, updateComplaintTrans);
 routerMisc.post("/updateComplaintQuiz/", checkToken, updateComplaintQuiz);
 
 module.exports = routerMisc;

