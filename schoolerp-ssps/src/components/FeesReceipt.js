import React, { useState, useEffect } from 'react';
import "../Css/FeeReceipt.css";
import { useParams } from 'react-router-dom';
import { BASE_URL } from "../appconfig";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';



const FeeReceipt = () => {
    const { paymentId } = useParams(); // Assume you are using React Router for route parameters
    const [invoiceData, setInvoiceData] = useState(null);
    const history = useNavigate();

    const navigateToHome = () => {
        history('/admin/home');
    };

    useEffect(() => {
        // Function to fetch payment data by ID
        const fetchPaymentData = async () => {
            try {
                const response = await fetch(`${BASE_URL}api/payment/get/${paymentId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"), // If your API requires authorization
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    // Process and set invoice data
                    const processedData = {
                        date: new Date(data.date).toLocaleDateString(),
                        receipt_no: data.receipt_no,
                        invoiceTo: {
                            name: data.studentId.first_Name + " " + data.studentId.last_Name,
                            roll_no: data.studentId.roll_Number,
                            father: data.studentId.father_Name,
                            contact: `${data.studentId.contact_Number}`,

                        },
                        payTo: {
                            name: 'Satya Sai Public School',
                            address: 'Sasaraam',
                            stateCountry: 'Bihar, India',
                            email: 'satyasaischools@gmail.com',
                        },
                        fees: data.feePaid.map(fee => ({
                            type: fee.feeType,
                            amount: `₹${fee.amount}/-`,
                        })),
                        totalFee: `₹${data.amountPaid - data.tax}/-`,
                        tax: `₹${data.tax}/-`, // Assuming tax is a fixed value

                        paymentMethod: data.
                            paymentMethod,
                        totalPayable: `₹${data.amountPaid}/-`, // Total payable including tax
                    };
                    setInvoiceData(processedData);
                } else {
                    console.error('Error fetching payment data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        };

        fetchPaymentData();
    }, [paymentId]);


    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        const printArea = document.getElementById('print-area');
        html2canvas(printArea).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('invoice.pdf');
        });
    };


    if (!invoiceData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="invoice-wrapper" id="print-area">
            <div className="invoice">
                <div className="invoice-container">
                    <div className="invoice-head">
                        <div className="invoice-head-top-right text-start">
                            <h3>Fee Invoice</h3>
                            <div className="invoice-head-middle-left text-start">
                                <p><span className="text-bold">Date</span>: {invoiceData.date}</p>
                            </div>
                            <div className="invoice-head-middle-right text-start">
                                <p><span className="text-bold">Invoice No:</span> {invoiceData.receipt_no}</p>
                            </div>
                            <div className="invoice-head-middle-right text-start">
                                <p><span className="text-bold">Payment mode:</span> {invoiceData.
                                    paymentMethod}</p>
                            </div>
                        </div>
                        <div className="invoice-head-top">
                            <div className="invoice-head-top-left text-start"></div>
                            <img
                                src="https://res.cloudinary.com/dttmlghjm/image/upload/v1714852409/logo-removebg-preview_as5e3l.png"
                                alt="School Logo"

                            />
                        </div>
                        <div className="invoice-head-top">
                            <div className="invoice-head-top-left text-start"></div>
                            <img
                                src="https://res.cloudinary.com/dttmlghjm/image/upload/v1715728995/ssps_scurhe.png"
                                alt="School QR"

                            />
                        </div>
                    </div>
                    <div className="hr"></div>
                </div>
                <div className="hr"></div>
                <div className="invoice-head-bottom-left">
                    <ul className="right-list">
                        <li className="text-bold">Invoice To:</li>
                        <li>Name - {invoiceData.invoiceTo.name}</li>
                        <li>Roll No. - {invoiceData.invoiceTo.roll_no}</li>
                        <li>Father - {invoiceData.invoiceTo.father}</li>
                        <li>Ph. No. - {invoiceData.invoiceTo.contact}</li>
                    </ul>
                    <ul className="left-list">
                        <li className="text-bold">Pay To:</li>
                        <li>{invoiceData.payTo.name}</li>
                        <li>{invoiceData.payTo.address}</li>
                        <li>{invoiceData.payTo.stateCountry}</li>
                        <li>{invoiceData.payTo.email}</li>
                    </ul>
                </div>
                <div className="overflow-view">
                    <div className="invoice-body">
                        <table>
                            <thead>
                                <tr>
                                    <td className="text-bold">Fees Type</td>
                                    <td className="text-bold">Fees Amount</td>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceData.fees.map((fee, index) => (
                                    <tr key={index}>
                                        <td>{fee.type}</td>
                                        <td className="text-end">{fee.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="invoice-body-bottom">
                            <div className="invoice-body-info-item border-bottom">
                                <div className="info-item-td text-end text-bold">Total Fee:</div>
                                <div className="info-item-td text-end">{invoiceData.totalFee}</div>
                            </div>
                            <div className="invoice-body-info-item border-bottom">
                                <div className="info-item-td text-end text-bold">Tax:</div>
                                <div className="info-item-td text-end">{invoiceData.tax}</div>
                            </div>
                            <div className="invoice-body-info-item">
                                <div className="info-item-td text-end text-bold">Total Payable:</div>
                                <div className="info-item-td text-end">{invoiceData.totalPayable}</div>
                            </div>
                        </div>
                    </div>
                    <div className="invoice-foot text-center">
                        <p>
                            <span className="text-bold text-center">NOTE:&nbsp;</span> This is a computer-generated bill and does not require physical signature.
                        </p>
                        <div className="invoice-btns">
                            <button type="button" className="button-29" onClick={() => window.print()}>
                                <span>Print Bill</span>
                            </button>
                            <button type="button" className="button-30" onClick={handleDownloadPDF}>
                                <span>Download Bill</span>
                            </button>
                            <button type="button" className="invoice-btn" onClick={navigateToHome}>
                                <span>Back to Home</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeeReceipt;
