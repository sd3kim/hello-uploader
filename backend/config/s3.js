const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const REGION = process.env.AWS_BUCKET_REGION;
const ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const SECRET_KEY = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
});
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: BUCKET_NAME,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: BUCKET_NAME,
  };
  return s3.getObject(downloadParams).createReadStream();
}
function getFiles() {
  const params = {
    Bucket: BUCKET_NAME,
  };
  return s3.listObjects(params).promise();
}

exports.uploadFile = uploadFile;
exports.getFileStream = getFileStream;
exports.getFiles = getFiles;
