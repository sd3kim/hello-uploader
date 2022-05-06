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

async function uploadFile(file) {
  const uploadParams = {
    Bucket: BUCKET_NAME,
  };
  await Promise.all(
    file.map((param) => {
      uploadParams.Key = param.filePath.split("/")[1];
      // Creating a read stream to the uploaded file
      uploadParams.Body = fs.createReadStream(param.filePath);
      // files/UUID
      s3.upload(uploadParams).promise();
    })
  );
}

function getAllFiles() {
  const params = {
    Bucket: BUCKET_NAME,
  };
  return s3.listObjects(params).promise();
}

exports.uploadFile = uploadFile;
exports.getAllFiles = getAllFiles;
