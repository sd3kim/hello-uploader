const File = require("../models/file");
const util = require("util");
const { uploadFile, getAllFiles, deleteFile } = require("../config/s3");
const fs = require("fs");

const unlinkFile = util.promisify(fs.unlink);

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "EB", "ZB", "PB", "YB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

async function fileUpload(req, res) {
  try {
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        fileSize: fileSizeFormatter(element.size, 2),
        user: req.user._id,
      };
      filesArray.push(file);
    });
    // send to s3
    const bucket = await uploadFile(filesArray);
    // send to mongo
    const files = await File.insertMany(filesArray);
    req.files.forEach((element) => unlinkFile(element.path));
    res.status(201).json(files);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function getFiles(req, res) {
  try {
    const awsResponse = await getAllFiles();
    const keyArr = awsResponse.Contents.map((obj) => {
      return obj.Key;
    });
    const key = await File.find({ user: req.user._id })
      .sort({ createdAt: "desc" })
      .exec();
    res.status(200).json(key);
    // every key -> user.find to grab user
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
}

async function deleteFiles(req, res) {
  try {
    const findPath = await File.findById({ _id: req.params.id });
    const path = findPath.filePath.split("/")[1];
    const file = await File.findByIdAndDelete({ _id: req.params.id });
    const Bucket = await deleteFile(path);
    res.status(200).json(file);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
}

module.exports = {
  fileUpload,
  getFiles,
  deleteFiles,
};
