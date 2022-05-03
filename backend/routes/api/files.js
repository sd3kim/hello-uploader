const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "files/" });
const filesCtrl = require("../../controllers/upload");

router.post("/files", upload.array("file"), filesCtrl.fileUpload);
router.get("/getFiles", filesCtrl.getFiles);

module.exports = router;
