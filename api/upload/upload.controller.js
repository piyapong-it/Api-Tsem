const multer = require('multer');
const path = require('path');

//=====================================================================================
// Multer upload image
// ====================================================================================
//storage engine
const storage = multer.diskStorage({
    destination: './workfile/images',
    filename: (req, file, cb) => {
        //return cb(null, `${file.fieldname}_${req.body.outletId}_${Date.now()}${path.extname(file.originalname)}`)
        return cb(null, `${file.fieldname}_${req.body.outletId}${path.extname(file.originalname)}`)
    }
})

const storageTask = multer.diskStorage({
    destination: './workfile/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${req.body.outletId}${path.extname(file.originalname)}`)
    }
})

const storageProfile = multer.diskStorage({
    destination: './workfile/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${req.body.outletId}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000  //Byte 1,000,000 = 1MB
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('defect');

const uploadTask = multer({
    storage: storageTask,
    limits: {
        fileSize: 1000000  //Byte 1,000,000 = 1MB
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('task');

const uploadOutletProfile = multer({
    storage: storageProfile,
    limits: {
        fileSize: 1000000  //Byte 1,000,000 = 1MB
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profile');

const uploadComplaint = multer({
    storage: storageTask,
    limits: {
        fileSize: 1000000  //Byte 1,000,000 = 1MB
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('complaint');

//Check File Type
function checkFileType(file, cb) {
    
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        console.log(mimetype);
        console.log(file);
        return cb('Error: Images only!!');
    }
}

module.exports = {
    uploadImage: (req, res) => {
        upload(req, res, (err) => {    
            if (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).send(JSON.stringify({ 
                        success: false,  
                        message: err.message,
                        profile_url: '' }));
                } else {
                    return res.status(200).send(JSON.stringify({ 
                        success: false,  
                        message: err,
                        profile_url: '' }));
                }
            } else {
                if (req.file == undefined) {
                    return res.status(200).send(JSON.stringify({ 
                        success: false,  
                        message: 'Error: No File Selected!',
                        profile_url: '' }));
                } else {
                    return res.status(200).send(JSON.stringify({ 
                        success: true,  
                        message: req.file.filename,
                        profile_url: `https://${process.env.APP_HOST}:${process.env.APP_PORT}/profile/${req.file.filename}` }));
                }
            }
        });
    },
    uploadImageTask: (req, res) => {
        uploadTask(req, res, (err) => {    
            if (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).send(JSON.stringify({ 
                        success: false,  
                        message: err.message,
                        profile_url: '' }));
                } else {
                    return res.status(200).send(JSON.stringify({ 
                        success: false,  
                        message: err,
                        profile_url: '' }));
                }
            } else {
                if (req.file == undefined) {
                    return res.status(200).send(JSON.stringify({ 
                        success: false,  
                        message: 'Error: No File Selected!',
                        profile_url: '' }));
                } else {
                    return res.status(200).send(JSON.stringify({ 
                        success: true,  
                        message: req.file.filename,
                        profile_url: `https://${process.env.APP_HOST}:${process.env.APP_PORT}/profile/${req.file.filename}` }));
                }
            }
        });
    },
    uploadImageOutlet: (req, res) => {
        uploadOutletProfile(req, res, (err) => {    
            if (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).send(JSON.stringify({ 
                        success: false,  
                        message: err.message,
                        profile_url: '' }));
                } else {
                    return res.status(200).send(JSON.stringify({ 
                        success: false,  
                        message: err,
                        profile_url: '' }));
                }
            } else {
                if (req.file == undefined) {
                    return res.status(200).send(JSON.stringify({ 
                        success: false,  
                        message: 'Error: No File Selected!',
                        profile_url: '' }));
                } else {
                    return res.status(200).send(JSON.stringify({ 
                        success: true,  
                        message: req.file.filename,
                        profile_url: `https://${process.env.APP_HOST}:${process.env.APP_PORT}/profile/${req.file.filename}` }));
                }
            }
        });
    },
    uploadImageComplaint: (req, res) => {
        uploadComplaint(req, res, (err) => {    
            if (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).send(JSON.stringify({ 
                        success: false,  
                        message: err.message,
                        profile_url: '' }));
                } else {
                    return res.status(200).send(JSON.stringify({ 
                        success: false,  
                        message: err,
                        profile_url: '' }));
                }
            } else {
                if (req.file == undefined) {
                    return res.status(200).send(JSON.stringify({ 
                        success: false,  
                        message: 'Error: No File Selected!',
                        profile_url: '' }));
                } else {
                    return res.status(200).send(JSON.stringify({ 
                        success: true,  
                        message: req.file.filename,
                        profile_url: `https://${process.env.APP_HOST}:${process.env.APP_PORT}/profile/${req.file.filename}` }));
                }
            }
        });
    },
}