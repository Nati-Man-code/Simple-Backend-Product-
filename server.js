const express = require("express");
const dotenv = require("dotenv").config(); // process.env
const connectDB = require("./config/db");
const port = process.env.PORT;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", require("./routes/ProductsRoutes"));
app.use("/api/users", require("./routes/UsersRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));