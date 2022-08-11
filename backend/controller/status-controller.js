import { connectDB, closeDB } from "../config/db.js";

let con = "";

const getStatus = async (req, res) => {
  con = await connectDB();
  const sql = "SELECT * FROM status";
  con.query(sql, (err, results) => {
    if (err) {
      res = err;
    } else {
      res.json({
        results,
      });
      closeDB(con);
    }
  });
};

const getName = async (req, res) => {
  con = await connectDB();
  const sql = `SELECT status_name FROM status`;
  con.query(sql, (err, results) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      res.json({
        results,
      });
      closeDB(con);
    }
  });
};

const newStatus = async (req, res) => {
  const status_id = req.body.status_id;
  const status_name = req.body.status_name;
  const status_description = req.body.status_description;

  con = await connectDB();
  const sql = `INSERT INTO status values(${status_id}, '${status_name}', '${status_description}')`;
  con.query(sql, (err, results) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      console.log(results);
      res.json({
        results,
      });
      closeDB(con);
    }
  });
};
const updateStatus = async (req, res) => {
  const status_id = req.body.status_id;
  const status_name = req.body.status_name;
  const status_description = req.body.status_description;

  con = await connectDB();
  const sql = `UPDATE status SET status_name = '${status_name}', status_description = '${status_description}' where status_id = ${status_id}`;
  con.query(sql, (err, results) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      console.log(results);
      res.json({
        results,
      });

      closeDB(con);
    }
  });
};
const deleteStatus = async (req, res) => {
  const status_id = req.body.status_id;
  con = await connectDB();
  const sql = `DELETE from status where status_id = ${status_id}`;
  con.query(sql, (err, results) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      console.log(results);
      res.json({
        results,
      });

      closeDB(con);
    }
  });
};
export { getStatus, getName, newStatus, updateStatus, deleteStatus };
