
const cloudinary = require('cloudinary').v2;

//here is cloudinary api credentials
cloudinary.config({
    cloud_name: 'ddbtf9wpe', 
    api_key: '273751642868465', 
    api_secret: 'OFLUtJ8NaUBx53K9tOUCxkORGlk' 
});

module.exports.uploadImage = async (fileStream, fileName)=>{
    const result = await uploadStream(fileStream, fileName);
    return result;
}

const uploadStream = (fileStream, name) => {

    //wrapping into promise for using modern async/await
    return new Promise((resolve, reject) => {        
        cloudinary.uploader.upload_stream({ public_id: name }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        }).end(fileStream)
    });
};