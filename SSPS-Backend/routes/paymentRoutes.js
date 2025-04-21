const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();
const Payment = require("../models/payment");
const StudentFeeProfile = require("../models/fees/studentFeeProfile")
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});
// ROUTE 1 : Create Order Api Using POST Method http://localhost:4000/api/payment/order
router.post('/order', (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
            console.log(order)
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
})
// ROUTE 2 : Create Verify Api Using POST Method http://localhost:4000/api/payment/verify
router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, studentId, receipt_no, feePaid, paymentMethod, amountPaid } = req.body;

    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // Verify Signature
        const isAuthentic = expectedSign === razorpay_signature;

        if (isAuthentic) {
            // Create a new Payment object
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                studentId,
                receipt_no,
                feePaid,
                paymentMethod,
                amountPaid
            });

            // Save the payment
            const savedPayment = await payment.save();

            // Update the StudentFeeProfile with the payment ID
            await StudentFeeProfile.findOneAndUpdate(
                { studentId: studentId },
                { $push: { payments: savedPayment._id } }, // Add the payment ID to the payments array
                { new: true }
            );

            // Send success response
            res.json({
                success: true,
                message: "Payment Successfully Verified",
                payment: savedPayment
            });
        } else {
            // If signature is not authentic, send error response
            res.status(400).json({ message: "Invalid Signature" });
        }
    } catch (error) {
        // Handle server errors
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// Get payment by ID
router.get('/get/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('studentId');
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get payment by receipt number
router.get('/receipt/:receipt_no', async (req, res) => {
    try {
        const payment = await Payment.findOne({ receipt_no: req.params.receipt_no }).populate('studentId');
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all payments
router.get('/getAll', async (req, res) => {
    try {
        const payments = await Payment.find()
        res.json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router