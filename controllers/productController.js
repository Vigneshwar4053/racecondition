const Product = require("../models/product");
const connectDB = require("../config/db");

exports.seedProduct = async (req, res) => {
  try {
    await connectDB();
    const name = req.body?.name || "Test Product";
    const quantity = typeof req.body?.quantity === "number" ? req.body.quantity : 1;

    let prod = await Product.findOne({ name });
    if (!prod) {
      prod = await Product.create({ name, quantity });
    }
    res.json({ message: "Seeded (or already exists)", product: prod });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to seed product" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    await connectDB();
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ error: "Not found" });
    res.json(prod);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

exports.resetProduct = async (req, res) => {
  try {
    await connectDB();
    const qty = typeof req.body?.quantity === "number" ? req.body.quantity : 1;
    const prod = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { quantity: qty } },
      { new: true }
    );
    if (!prod) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Reset OK", product: prod });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to reset product" });
  }
};

exports.buyProduct = async (req, res) => {
  try {
    await connectDB();
    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, quantity: { $gt: 0 } },
      { $inc: { quantity: -1 } },
      { new: true }
    );
    if (!updated) {
      return res.status(409).json({ message: "Out of stock" });
    }
    res.json({
      message: "Purchase successful",
      productId: updated._id,
      quantityLeft: updated.quantity,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Purchase failed" });
  }
};
