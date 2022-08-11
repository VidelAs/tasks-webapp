import mysql from "mysql";


const connectDB = async () => {
  let res;
  let json_res;
  let connection;
  try {
    connection = mysql.createConnection(process.env.CONNECTION_STRING);

    console.log("DataBase connected!!!");

  } catch (error) {
    res = `Error: ${error.message}`;
    return res;
  }
  return connection;
};

const closeDB = (connection) => {
  connection.end();
};

export { connectDB, closeDB };
