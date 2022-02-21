const mysql2 = require("mysql");
const dbConfig = require("../config/config");


class DBConnection {
    constructor() {
        this.db = mysql2.createPool(dbConfig.db);
        this.checkConnection();
    }

    checkConnection() {
        this.db.getConnection((err, connection) =>{
            if(err) {
                if (err.code === "PROTOCOL_CONNECTION_LOST") {
                  console.error("Database connection was closed.");
                }
                if (err.code === "ER_CON_COUNT_ERROR") {
                  console.error("Database has too many connections.");
                }
                if (err.code === "ECONNREFUSED") {
                  console.error("Database connection was refused.");
                } else {
                  console.log(err);
                }
            }
            if (connection) {
              console.log("database connected");
              connection.release();
            }
            return
        })
    }

    query = async (sql, values) =>{
      sql.replace(/\\/g, "");
      return new Promise((resolve, reject) =>{
        const callback = (error, result) =>{
          if(error) {
            reject(error);
            return;
          }
          resolve(result);
        }
        //will execute internally call, prepare and query
        this.db.query(sql, values, callback);
      }).catch(err =>{
        const mysqlErrorList = Object.keys(HttpStatusCodes);
        // convert mysql errors which in the mysqlErrorList list to http status code
        err.status = mysqlErrorList.includes(err.code)
          ? HttpStatusCodes[err.code]
          : err.status;

          throw err;
      })
    }
}

// like ENUM
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});

module.exports = new DBConnection;