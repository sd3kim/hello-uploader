const Files = require("../models/file");
const MultipleFile = require("../models/multipleFiles");
const fs = require("fs");
const { uploadFile, getFileStream } = require("../config/s3");
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

async function create(req, res) {
  try {
    console.log(req.file);
    const result = await uploadFile(req.file);
    console.log(result);
    const files = await Files.create({
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
      // user: req.user._id,
    });
    res.json(files);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
}

// async function index(req, res) {
//   try {
//     const result = await Files.find();
//     res.json(result);
//   } catch (err) {
//     console.log("error", err);
//     res.status(500).json(err);
//   }
// }
async function getMultipleFiles(req, res) {
  try {
    const files = await MultipleFile.find();
    console.log("this is files", files);
    res.status(200).json(files);
  } catch (err) {
    res.status(400).send(err.message);
  }
}
async function multipleFileUpload(req, res) {
  try {
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        fileSize: fileSizeFormatter(element.size, 2),
      };
      filesArray.push(file);
    });
    const multipleFiles = new MultipleFile({
      files: filesArray,
    });
    console.log("this is multiple files", multipleFiles);
    await multipleFiles.save();
    // const multipleFiles = await MultipleFile.create({
    //   files: filesArray,
    // });
    res.status(201).json(multipleFiles);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  create,
  index,
  multipleFileUpload,
  getMultipleFiles,
};
