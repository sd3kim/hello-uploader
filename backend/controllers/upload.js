const Files = require("../models/file");
const fs = require("fs");
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
    const files = new Files({
      fileName: req.file.originalname,
      // filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
      // user: req.user._id,
    });
    await files.save();
    res.json(req.file);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
}

async function index(req, res) {
  try {
    const result = await fs.promises.readdir("images/");
    const files = await Files.find();
    // res.json(result);
    console.log("hi");
    res.status(200).send(files);
  } catch (err) {
    console.log("error", err);
    res.status(500).json(err);
  }
}

module.exports = {
  create,
  index,
};
