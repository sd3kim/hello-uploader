const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema(
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
  },
  { timestamps: true }
);

const mutipleFilesSchema = new Schema(
  {
    files: [Object],
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
module.exports = mongoose.model("MultipleFile", mutipleFilesSchema);
