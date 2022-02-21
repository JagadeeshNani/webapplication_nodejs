const express = require("express");
const router = express.Router();
const upload = require("../utils/upload")
const studentdata = require("../controllers/students");

router.post("/upload", upload.single("file"), studentdata.upload);
router.get("/students/:id/result", studentdata.result)
router.get("/students", studentdata.getDataByResultStatus)

module.exports = router;
