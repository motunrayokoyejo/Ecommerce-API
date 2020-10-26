const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req,res, callback)=> {
        callback(null, path.join("./files/"));
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new Error('Not an image! Please upload an image.', 400), false);
    }
};

exports.upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter
});