const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

const uploadFileToCloudinary = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", public_id: fileName },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // Pass the file buffer directly to the upload stream
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

module.exports = uploadFileToCloudinary;
