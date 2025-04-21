const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    receipt_no: {
        type: String,
    },
    feePaid: [{
        feeType: { type: String, required: true }, // Reference to the fee type
        amount: { type: Number, required: true }, // Amount of the fee
    }],
    paymentMethod: {
        type: String,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    }
});





const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
