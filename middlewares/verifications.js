var connection = require("../configs/connection");

exports.isOnlyNicName = (name) => {
  const p = new Promise((resolve, reject) => {
    connection.query(`SELECT count(nick_name) FROM user WHERE nick_name='${name}'`, (err, rows) => {
      if (!err) {
        if (rows[0]["count(nick_name)"] === 0) {
          resolve(true);
        } else {
          const errorMessage = "중복된 닉네임입니다.";
          reject(errorMessage);
        }
      } else {
        reject(err);
      }
    });
  });
  return p;
};

exports.isOnlyEmail = (email) => {
  const p = new Promise((resolve, reject) => {
    connection.query(`SELECT count(email) FROM user WHERE email='${email}'`, (err, rows) => {
      if (!err) {
        if (rows[0]["count(email)"] === 0) {
          resolve(rows);
        } else {
          const errorMessage = "중복된 E-Mail입니다.";
          reject(errorMessage);
        }
      } else {
        reject(err);
      }
    });
  });
  return p;
};
