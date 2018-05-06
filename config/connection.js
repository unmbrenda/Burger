var mysql = require('mysql');

const config = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password",
  database: "burger_db"
};


const query = async function(sql, args){
  return new Promise( (resolve, reject) => {

    const connection =
      mysql.createConnection( process.env.JAWSDB_URL || config );

    connection.query(sql, args, (err, rows, cols) => {
      connection.end();
      if(err){
        return reject(err);
      }
      resolve(rows);
    });
  });
}

module.exports = query;