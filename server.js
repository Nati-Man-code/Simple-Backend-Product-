const express = require("express");
const dotenv = require("dotenv").config(); // process.env
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const productRouter = require('./routes/productRoutes')
const userRouter = require('./routes/userRoutes')

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));