/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 21/06/2016
 * Time: 15:18
 */
const router = require('express').Router();
var multer  = require('multer');
var upload = multer({ dest: './server/uploads/' });
var cloudinary = require('cloudinary');
var constants = require('../constants');
var fs = require("fs");

cloudinary.config({
    cloud_name: constants.CLOUDINARY_NAME,
    api_key: constants.CLOUDINARY_API_KEY,
    api_secret: constants.CLOUDINARY_API_SECRET
});

router.post('/', upload.single('file'), function (req, res, next) {

    var type = req.body.type
    const file = req.file;

    if(type == "avatar"){
        return uploadAvatar(file,res)
    }

    // Grab extension from uploaded file
    var re = /(?:\.([^.]+))?$/;
    var extension = re.exec(file.originalname)[1];

    // Move the file to uploads folder
    var path = './public/uploads/'+file.filename+"."+extension;
    fs.rename(file.path, path);

    FileUpload.uploadToCloudinary(path, 540, 400, "fill", function(url){
        res.status(200).send({url: url});
    })


});




function uploadAvatar(file, res){

    // Grab extension from uploaded file
    var re = /(?:\.([^.]+))?$/;
    var extension = re.exec(file.originalname)[1];

    // Move the file to uploads folder
    var path = './public/uploads/'+file.filename+"."+extension;
    fs.rename(file.path, path);

    FileUpload.uploadToCloudinary(path, 160, 160, "fill", function(url){
        res.status(200).send({url: url});
    })


}


const FileUpload = {

    uploadToCloudinary: function(path, width, height, crop, callback){

        // Upload file to cloudinary
        cloudinary.uploader.upload(path, function (result) {
            // Send uploaded image url back
            var url = result.url
            callback(url)

            // Delete local copy
            fs.unlink(path);
        }, {
            width: width,
            height: height,
            crop: crop
        });
    }
}

module.exports = {router, FileUpload};