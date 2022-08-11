import { connectDB, closeDB } from "../config/db.js";

let con = "";
const getUsers = async (req, res) => {
  con = await connectDB();
  const sql = "SELECT * FROM users";
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
const getNames = async (req, res) => {
  con = await connectDB();
  const sql = "SELECT user_id, user_first_name, user_last_name FROM users";
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
const newUser = async (req, res) => {
  const user_id = req.body.user_id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const phone = req.body.phone;
  const address_id = req.body.address_id;
  const pais = req.body.pais;
  const provincia = req.body.provincia;
  const canton = req.body.canton;
  const distrito = req.body.distrito;
  const direccion = req.body.direccion;

  con = await connectDB();
  const address = `INSERT INTO address values(${address_id}, '${pais}', '${provincia}', '${canton}','${direccion}','${distrito}')`;
  con.query(address, (err, res_address) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      const user = `INSERT INTO users values(${user_id}, '${first_name}', '${last_name}', '${email}','${phone}',${address_id})`;
      con.query(user, (err, res_user) => {
        if (err) {
          res.json({
            msg: err,
          });
        } else {
          res.json({
            res_user,
            res_address,
          });
          closeDB(con);
        }
      });
    }
  });
};
const updateUser = async (req, res) => {
  const user_id = req.body.user_id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const phone = req.body.phone;
  const address_id = req.body.address_id;
  const pais = req.body.pais;
  const provincia = req.body.provincia;
  const canton = req.body.canton;
  const distrito = req.body.distrito;
  const direccion = req.body.direccion;

  con = await connectDB();
  const address = `UPDATE address SET pais = '${pais}', provincia = '${provincia}', canton = '${canton}', direccion = '${direccion}', distrito = '${distrito}' WHERE address_id = ${address_id}`;
  con.query(address, (err, res_address) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      const user = `UPDATE users SET user_first_name = '${first_name}', user_last_name = '${last_name}', user_email = '${email}', user_phone = '${phone}' WHERE user_id = ${user_id}`;
      con.query(user, (err, res_user) => {
        if (err) {
          res.json({
            msg: err,
          });
        } else {
          res.json({
            res_user,
            res_address,
          });
          closeDB(con);
        }
      });
    }
  });
};
const deleteUser = async (req, res) => {
  const user_id = req.body.user_id;
  const address_id = req.body.address_id;

  con = await connectDB();
  const user = `DELETE FROM users WHERE user_id = ${user_id}`;
  con.query(user, (err, res_user) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      const address = `DELETE from address WHERE address_id = ${address_id}`;
      con.query(address, (err, res_address) => {
        if (err) {
          res.json({
            msg: err,
          });
        } else {
          res.json({
            res_user,
            res_address,
          });
          closeDB(con);
        }
      });
    }
  });
};
export { getUsers, getNames, newUser, updateUser, deleteUser };
