const express = require('express');
const db = require("./database/index");
const User = require('./Models/user');
const Product = require('./Models/product');
const userRoutes = require("./routes/users")
const productRoutes = require("./routes/products")
const transactionRoutes = require("./routes/transactions")
const jwt = require("jsonwebtoken")
const secret = 'secret'
require("dotenv").config()



const app = express();

app.use(express.json());
app.use(express.urlencoded())

app.use("/product", productRoutes)
app.use("/user", userRoutes)
app.use("/transaction", transactionRoutes)


app.get('*', (req, res) => {
  res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => {
  console.log('Server na portu 3000');
})