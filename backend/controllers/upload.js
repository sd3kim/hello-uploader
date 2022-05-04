const File = require("../models/file");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile, getAllFiles } = require("../config/s3");
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

// async function create(req, res) {
//   try {
//     console.log(req.file);
//     // const result = await uploadFile(req.file);
//     // console.log(result);
//     const files = await File.create({
//       fileName: req.file.originalname,
//       filePath: req.file.path,
//       fileType: req.file.mimetype,
//       fileSize: fileSizeFormatter(req.file.size, 2),
//       user: req.user._id,
//     });
//     res.json(files);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err.message);
//   }
// }

async function getFiles(req, res) {
  try {
    const awsResponse = await getAllFiles();

    const keyArr = awsResponse.Contents.map((obj) => {
      return obj.Key;
    });
    const keyArr2 = awsResponse.Contents.map((obj) => {
      return obj;
    });
    console.log("this is aws response", awsResponse);
    // const keyArrUser = keyArr2

    // console.log("this is arr key", keyArrUser);
    // const files = await File.map((el) => el.files.map((id) => console.log(id)));
    const files = await File.find({ user: req.user._id })
      .sort({ createdAt: "desc" })
      .exec();
    console.log("this is files in controller", files);
    res.status(200).json(keyArr);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
}
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
      //   unlinkFile(element.path);
    });
    console.log("this is files array", filesArray);
    // await unlinkFile(req.file.filePath);
    const bucket = await uploadFile(filesArray);
    const files = new File({
      files: filesArray,
    });
    req.files.forEach((element) => unlinkFile(element.path));
    console.log("this is multiple files", files);
    await files.save();
    // const files = await MultipleFile.create({
    //   files: filesArray,
    // });
    res.status(201).json(files);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  //   create,
  fileUpload,
  getFiles,
};
