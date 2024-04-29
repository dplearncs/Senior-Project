import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  //   host: "localhost",
  //   user: "root",
  //   password: "SeniorProjectDavid2024%",
  //   database: "tellycrate",
});

app.get("/", (req, res) => {
  res.json("hello from port 5050");
});

app.get("/login", (req, res) => {
  const q = "SELECT * FROM tellycrate.customers;";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// sending data to db
app.post("/register", (req, res) => {
  const q =
    "INSERT INTO `tellycrate`.`customers` (`first_name`, `email`, `password`) VALUES (?)";

  const values = [req.body.name, req.body.email, req.body.password];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// get all the box
app.get("/profilePage/", (req, res) => {
  const q = "SELECT * FROM `tellycrate`.`box`;"
  const values = [
    req.body.box_name,
    req.body.total_items,
    req.body.description,
    req.body.customer_id,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// add box
  app.post("/profilepage/", (req, res) => {
    const q = "INSERT INTO `tellycrate`.`box` (`box_name`, `description`, `customer_id`) VALUES (?);"
    const values = [
      req.body.box_name,
      req.body.description,
      req.body.customer_id,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
// Deleting the container
app.delete("/profilePage/:id", (req, res) => {
  const boxId = req.params.id;
  const q = "DELETE FROM `tellycrate`.`box` WHERE (`box_id` = ?)"

  db.query(q, [boxId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Get all the items
app.get("/addOrDelete", (req, res) => {
  const q = "SELECT * FROM `tellycrate`.`items`;"

  const values = [];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Delete item
app.delete("/addOrDelete/:id", (req, res) => {
  const item_id = req.params.id;
  const q = "DELETE FROM `tellycrate`.`items` WHERE (`item_id` = ?)"

  db.query(q, [item_id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Adding items
app.post("/addOrDelete", (req, res) => {
  const q =
    "INSERT INTO `tellycrate`.`items` (`item_name`, `item_description`, `box_id`) VALUES (?)";

  const values = [req.body.item_name, req.body.item_description, req.body.box_id];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.post("");

app.listen(5050, () => {
  console.log("backend is connected on port 5050");
});
