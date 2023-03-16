const { 
    uploadImage,
    uploadImageTask,
    uploadImageOutlet,
    uploadImageComplaint
} = require("./upload.controller");

const routerUpload = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

routerUpload.post("/",checkToken, uploadImage);
routerUpload.post("/uploadTaskImage/", checkToken, uploadImageTask);
routerUpload.post("/uploadOutletImage/", checkToken, uploadImageOutlet);
routerUpload.post("/uploadComplaintImage/", checkToken, uploadImageComplaint);

module.exports = routerUpload;