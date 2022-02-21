const fs = require("fs");
const fastcsv = require("fast-csv")
const StudentsModel = require('../models/studentModel')

var Students = {
  upload: async (req, res) => {
    console.log("/upload/" + req.file.filename);
    let stream = fs.createReadStream("./upload/" + req.file.filename);
    let csvdata = [];
    let csvStream = fastcsv
      .parse()
      .on("data", async (data) => {
        csvdata.push(data);
      })
      .on("end", async () => {
        //remove the first line: header
        csvdata.shift();
        let result = await StudentsModel.create(csvdata);
        return res.status("200").send(result);
      });
    let response = stream.pipe(csvStream);
  },

  result: async (req, res) => {
    console.log(req.params.id);
    let response = await StudentsModel.findOne(req.params);
    if (response.Mark1 > 35 && response.Mark2 > 35 && response.Mark3 > 35) {
      return res.status(200).send("Passed");
    } else {
      return res.status(200).send("Failed");
    }
  },

  getDataByResultStatus: async (req, res)=>{
      console.log(req.query.resultStatus)
      let result = await StudentsModel.getResultByStatus(
        req.query.resultStatus
      );

      res.status(200).send(result);
  }
};

module.exports = Students;