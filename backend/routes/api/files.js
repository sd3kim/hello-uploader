const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "images/" });
const filesCtrl = require("../../controllers/upload");

router.post("/", upload.single("image"), filesCtrl.create);
router.get("/", filesCtrl.index);
module.exports = router;
