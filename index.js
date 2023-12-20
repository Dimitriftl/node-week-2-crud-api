const express = require("express");
const app = express();

const products = require("./resources/products/products.route");

require("dotenv").config();

require("./db/connect")();
app.use(() => console.log("first middle"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("api/v1/products", products);

// CRUD - Create Read Update Delete

// GET - Read
// POST - Create
// PUT - Update
// DELETE - Delete

// [GET /users - GET /users/id - POST /users - PUT /users/id - DELETE /users/id] ==> API RESTful

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// mangoose version

// OK
// app.get("/products", async (req, res) => {
//   const title = req.query.title;
//       try{
//           const product = await Product.findOne({ title });
//           product ?
//           res.send({
//               ok: true,
//               product
//           }) :
//           res.status(404).send({
//               ok: false,
//               msg: `Product with title ${title} does not exist`
//           });
//       }
//       catch(error){
//           res.status(404).send({
//               ok: false,
//               msg: `Bad request`
//           });
//       }
// });

// OK
// app.get("/products/:id", async (req, res) => {});

// //OK
// app.get("/products/title", async (req, res) => {
//   const title = req.query.title;

//   try {
//     const products = await Product.findOne({ title });
//     res.status(200).send({
//       ok: true,
//       data: products,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       ok: false,
//       msg: "Internal Server Error",
//     });
//   }
// });

// //OK
// app.post("/products", async (req, res) => {});

// //OK
// app.put("/products/:id", async (req, res) => {});

// //OK
// app.delete("/products/:id", async (req, res) => {});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
