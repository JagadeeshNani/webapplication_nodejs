const db = require("../db/db-connection");
const {
  multipleColumnSet,
  multipleColumnUpdate,
} = require("../utils/common.utils");

class StudentsModel {
    tableName = "students";

    constructor(){
        let sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (
                    Id INT NOT NULL AUTO_INCREMENT,
                    Name VARCHAR(50) NOT NULL,
                    Age INT,
                    Mark1 INT,
                    Mark2 INT,
                    Mark3 INT,
                    PRIMARY KEY(Id)
                    )`;
        db.query(sql);
    }

    create = async (data) =>{
        let sql = `INSERT INTO ${this.tableName} VALUES ?`;
        const result = await db.query(sql,[data]);
        return result.affectedRows > 0 ? "Data Uploaded Successfully!" : result;
    }

    findOne= async (params) =>{
        let {columnSet, values} = multipleColumnSet(params);
        let sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`
        let data = await db.query(sql, [values]);
        return data[0];
    }

    getResultByStatus= async (params)=>{
        if(params==='passed'){
            let sql = `SELECT students.Name FROM ${this.tableName} 
            WHERE students.Mark1 > 35 AND
            students.Mark2 > 35 AND
            students.Mark3 > 35  `;
            let data = await db.query(sql);
            return data;
        }
        if(params==='failed'){
            let sql = `SELECT students.Name FROM ${this.tableName} 
            WHERE students.Mark1 < 35 OR
            students.Mark2 < 35 OR
            students.Mark3 < 35 `;
            let data = await db.query(sql);
            return data;
        }
        
    }
}

module.exports = new StudentsModel;