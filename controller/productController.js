const db = require("../connection/conn");
const HTTPStatus = require("../helper/HTTPStatus");

module.exports = {
  getAllProduct: async (req, res) => {
    try {
      const query = `SELECT * FROM product`;
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }
        new HTTPStatus(res, result).success("get product success").send();
      });
    } catch (error) {
      res.status(500).send("gagal");
    }
  },
  newProduct: async (req, res) => {
    try {
      console.log("hai");
      let { name, price } = JSON.parse(req.body.data);
      let img = req.files.images[0].path;

      const query = `INSERT INTO product SET ?`;
      db.query(query, { name, price, img }, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }
        new HTTPStatus(res, result).success("post product success").send();
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  addToCart: async (req, res) => {
    try {
      console.log("popop");
      let { product_id, qty } = req.body;
      console.log(product_id, qty);
      const query = `INSERT INTO cart SET ?`;
      db.query(query, { product_id, qty }, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }
        new HTTPStatus(res, result)
          .success("add to cart product success")
          .send();
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  getCart: async (req, res) => {
    try {
      const query = `SELECT p.id, p.name,p.price,p.img, SUM(c.qty) AS total_qty
            FROM cart c
            RIGHT JOIN product p ON c.product_id = p.id
            GROUP BY p.id, p.name
            HAVING total_qty != 0`;
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }
        new HTTPStatus(res, result).success("get cart success").send();
      });
    } catch (error) {}
  },
  deleteCart: async (req, res) => {
    try {
      const query = `DELETE FROM cart
        WHERE qty = 1
        LIMIT 1000;`;
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }
        new HTTPStatus(res).success("delete cart success").send();
      });
    } catch (error) {}
  },
};
