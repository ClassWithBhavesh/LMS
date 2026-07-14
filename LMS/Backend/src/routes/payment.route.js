const express = require("express");

const router = express.Router();

const {protect} = require("../middlewares/auth.middleware.js");

const {createOrder, verifyPayment} = require("../controllers/payment.controller.js");


router.post("/create-order", protect, createOrder);

router.post("/verify-payment", protect, verifyPayment);


module.exports = router;