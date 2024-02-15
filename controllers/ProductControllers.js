
const Product = require("../model/ProductModel");

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

const getProducts = async (req, res) => {
  const products = await Product.find({ user: req.user.id });
  res.status(200).json(products);
};

const createProduct = async (req, res) => {
  const product = await Product.create({
    user: req.user.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
  });

  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400).json({ error: "Product not found" });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ error: "User not found" });
  }

  if (product.user.toString() !== user.id) {
    res.status(401).json({ error: "User not authorized" });
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ updatedProduct });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400).json({ error: "Product not found" });
  }

  if (product.user.toString() !== req.user.id) {
    res.status(401).json({ error: "User not authorized" });
  }

  await product.remove();
  res.status(200).json({ id: req.params.id });
};
