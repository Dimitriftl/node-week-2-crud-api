const express = require("express");
const app = express();


const Product = require("./resources/products/products.model"); // schema de nos documents
require("dotenv").config();

require("./db/connect")();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// CRUD - Create Read Update Delete

// GET - Read
// POST - Create
// PUT - Update
// DELETE - Delete

// [GET /users - GET /users/id - POST /users - PUT /users/id - DELETE /users/id] ==> API RESTful

app.get("/", (req, res) => {
  res.send("Hello World");
});

// mangoose version

// OK
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);
    res.status(200).send({
      ok: true,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      ok: false,
      msg: "Internal Server Error",
    });
  }
});

//OK
app.get("/products/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const products = await Product.findById(id);
    res.status(200).send({
      ok: true,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      ok: false,
      msg: "Internal Server Error",
    });
  }
});

//OK
app.get("/products/title", async (req, res) => {
  const title = req.query.title;

  try {
    const products = await Product.findOne({ title });
    res.status(200).send({
      ok: true,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      ok: false,
      msg: "Internal Server Error",
    });
  }
});

//OK
app.post("/products", async (req, res) => {
  const product = new Product({ ...req.body }); // prend uniquement ce qu'il a besoin

  try {
    await product.save();
    res.status(201).send({
      ok: true,
      data: product,
    });
  } catch (err) {
    res.status(500).send({
      ok: false,
      msg: "internal server error",
    });
  }
});

//OK
app.put("/products/:id", async (req, res) => {
  // updateOne
  const id = req.params.id;
  const productReceived = req.body;

  try {
    const productUpdated = await Product.findByIdAndUpdate(id, productReceived);

    res.status(200).send({
      ok: true,
      data: productUpdated,
    });
  } catch (err) {
    res.status(404).send({
      ok: false,
      msg: "Product not found",
    });
  }
});

//OK
app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Product.findOneAndDelete({ _id: id });
    res.status(200).send({
      ok: true,
      msg: "product has been deleted",
    });
  } catch (err) {
    res.status(404).send({
      ok: false,
      msg: "product not found",
      product: id,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
