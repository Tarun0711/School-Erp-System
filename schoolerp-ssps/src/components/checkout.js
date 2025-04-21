import React, { useState, useEffect } from "react";
import "../Css/Checkout.css";
import { toast } from "react-toastify";
import { BASE_URL } from "../appconfig";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";

const Checkout = ({
  studentName,
  studentID,
  grade,
  billingContact,
  feesData,
  section,
  roll_Number,
  closeModal,
}) => {
  const [amount, setAmount] = useState(350);
  const [tax, setTax] = useState(0); // State to store tax amount
  const navigate = useNavigate();
  const handleClose = () => {
    closeModal(false);
  };

  useEffect(() => {
    // Calculate and set the total amount and tax once when the component mounts or feesData changes
    const totalAmount = calculateTotalAmount(feesData);
    const taxAmount = (totalAmount * 2.18) / 100; // Calculate tax amount
    console.log(taxAmount);
    setTax(taxAmount);
    setAmount(totalAmount + taxAmount);
  }, [feesData]); // Only re-run the effect if feesData changes

  const calculateTotalAmount = (selectedItems) => {
    // Initialize total amount to 0
    let totalAmount = 0;

    // Iterate over each selected item
    selectedItems.forEach((item) => {
      // Convert the amount to a number if it's a string
      const amount =
        typeof item.amount === "string" ? parseFloat(item.amount) : item.amount;

      // Add the amount of each item to the total amount
      totalAmount += amount;
    });

    // Return the total amount
    return totalAmount;
  };

  // handlePayment Function
  const handlePayment = async () => {
    console.log("click")
    try {
      const res = await fetch(`${BASE_URL}api/payment/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      });

      const data = await res.json();
      console.log(data);
      handlePaymentVerify(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // handlePaymentVerify Function
  const handlePaymentVerify = async (data) => {
    console.log(data)
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Satya Sai Public School Jhakar",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const res = await fetch(`${BASE_URL}api/payment/verify`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              studentId: studentID, // Pass the student ID to associate the payment with the student
              receipt_no: data.receipt, // Provide the receipt number if available
              feePaid: feesData,
              paymentMethod: "Online", // Assuming it's an online payment
              amountPaid: amount,
              tax: tax,
            }),
          });

          const verifyData = await res.json();

          if (verifyData.success) {
            toast.success(verifyData.message);

            navigate(`/feeReceipt/${verifyData.payment._id}`);
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="modal-overlay">
      <div className="container">
        <div className="header">
          <div style={{position:"absolute",top:"0",right:"0",color:"red",cursor:"pointer"}}>
            <IoIosCloseCircle fontSize={28} onClick={handleClose} />
          </div>
          <h2>Checkout - SSPS</h2>
          <p>Please review your payment details</p>
        </div>
        <div className="receipt">
          <div className="receipt-item">
            <label>Student Name:</label>
            <span>{studentName}</span>
          </div>
          <div className="receipt-item">
            <label>Roll No:</label>
            <span>{roll_Number}</span>
          </div>
          <div className="receipt-item">
            <label>Class:</label>
            <span>
              {grade} <span>{section}</span>{" "}
            </span>
          </div>
          <div className="receipt-item">
            <label>Payment Method:</label>
            <span>Online</span>
          </div>

          <div className="receipt-item">
            <label> Contact :</label>
            <span>{billingContact}</span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Fee Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {feesData.map((fee, index) => (
              <tr key={index}>
                <td>{fee.feeType}</td>
                <td>₹{fee.amount}</td>
              </tr>
            ))}
            <tr>
              <td>Platform Fee</td>
              <td>₹{tax} (2.18%)</td>
            </tr>
          </tbody>
        </table>
        <div className="receipt-item receipt-total">
          <label>Total :</label>
          <span> ₹ {amount.toFixed(2)}</span>
        </div>
        <button onClick={handlePayment} className="button">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
