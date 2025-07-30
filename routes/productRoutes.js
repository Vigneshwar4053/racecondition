const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/health", (_req, res) => res.json({ ok: true }));
router.post("/seed", controller.seedProduct);
router.get("/product/:id", controller.getProduct);
router.post("/reset/:id", controller.resetProduct);
router.post("/buy/:id", controller.buyProduct);

module.exports = router;
