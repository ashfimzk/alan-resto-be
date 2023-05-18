const db = require("../connection/conn");
const HTTPStatus = require("../helper/HTTPStatus");

module.exports = {
  login: async (req, res) => {
      try {
        const {password,username} = req.query
        const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
        const values = [username, password];
        db.query(query, values,(err, result) => {
          if (err) {
            console.log(err)
            return res.status(500).send("Internal Server Error");
          }
          new HTTPStatus(res,result).success("Login Success").send();
        });
      } catch (error) {
        res.status(500).send("gagal");

      }
  },
};
