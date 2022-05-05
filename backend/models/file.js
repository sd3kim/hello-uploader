const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filesSchema = new Schema(
  {
    fileName: { type: String, required: true },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    // .find  = get docu; want ref data
    // .populate on query and you
  },

  { timestamps: true }
);

// File is converted to lowercase and plural in mongodb
module.exports = mongoose.model("File", filesSchema);

// join user and file
