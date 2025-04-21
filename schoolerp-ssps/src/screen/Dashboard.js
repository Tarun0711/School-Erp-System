import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import DashboardCard from "../components/DashboardCard";
import { BASE_URL } from "../appconfig";
import { BarChart } from "../components/BarChart";
import { CategoryScale, Colors } from "chart.js";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaFileDownload } from "react-icons/fa";

const recentTransactions = [
  {
    AdmissionNo: 1001,
    Amount: 250.0,
    TransactionID: "TXN001",
    Date: "2024-07-15",
  },
  {
    AdmissionNo: 1002,
    Amount: 150.0,
    TransactionID: "TXN002",
    Date: "2024-07-16",
  },
  {
    AdmissionNo: 1003,
    Amount: 200.0,
    TransactionID: "TXN003",
    Date: "2024-07-17",
  },
  {
    AdmissionNo: 1004,
    Amount: 300.0,
    TransactionID: "TXN004",
    Date: "2024-07-18",
  },
  {
    AdmissionNo: 1005,
    Amount: 120.0,
    TransactionID: "TXN005",
    Date: "2024-07-19",
  },
  {
    AdmissionNo: 1006,
    Amount: 180.0,
    TransactionID: "TXN006",
    Date: "2024-07-20",
  },
  {
    AdmissionNo: 1007,
    Amount: 220.0,
    TransactionID: "TXN007",
    Date: "2024-07-21",
  },
  {
    AdmissionNo: 1008,
    Amount: 275.0,
    TransactionID: "TXN008",
    Date: "2024-07-22",
  },
  {
    AdmissionNo: 1009,
    Amount: 260.0,
    TransactionID: "TXN009",
    Date: "2024-07-23",
  },
  {
    AdmissionNo: 1010,
    Amount: 190.0,
    TransactionID: "TXN010",
    Date: "2024-07-24",
  },
];

export default function Dashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [sectionCount, setSectionCount] = useState(0);
  const [feesDues, setFeesDues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPayments, setTotalPayments] = useState(0);
  Chart.register(CategoryScale);

  // Example data structure for chartData
  const chartData = {
    labels: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
    datasets: [
      {
        label: "Fees Dues",
        data: [2000, 2500, 1800, 3000, 2200], // Example fees dues for each class
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  useEffect(() => {
    // Fetch student count
    fetch(`${BASE_URL}api/student/getStudents`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch student data");
        }
        return res.json();
      })
      .then((result) => {
        setStudentCount(result.length);
      })
      .catch((err) => {
        setError(err.message);
      });

    // Fetch class data
    fetch(`${BASE_URL}api/class/getAll`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch class data");
        }
        return res.json();
      })
      .then((result) => {
        setClassCount(result.length);
        // Calculate total section count
        let totalSections = 0;
        result.forEach((cls) => {
          totalSections += cls.sections.length;
        });
        setSectionCount(totalSections);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
    // Fetch total number of payments
    fetch(`${BASE_URL}api/payment/getAll`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch payment data");
        }
        return res.json();
      })
      .then((result) => {
        setTotalPayments(result.length);
      })
      .catch((err) => {
        setError(err.message);
      });

    // Fetch fees dues data
    // fetch(`${BASE_URL}api/fees/dues`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": localStorage.getItem("token")
    //   },
    // })
    // .then((res) => {
    //   if (!res.ok) {
    //     throw new Error("Failed to fetch fees dues data");
    //   }
    //   return res.json();
    // })
    // .then((result) => {
    //   setFeesDues(result);
    //   setIsLoading(false);
    // })
    // .catch((err) => {
    //   setError(err.message);
    //   setIsLoading(false);
    // });
  }, []);

  // Prepare data for fees dues chart
  // const feesDuesData = {
  //   labels: feesDues.map((dues) => dues.studentName),
  //   datasets: [
  //     {
  //       label: "Fees Dues",
  //       backgroundColor: "rgba(255, 99, 132, 0.6)",
  //       borderColor: "rgba(255, 99, 132, 1)",
  //       borderWidth: 1,
  //       hoverBackgroundColor: "rgba(255, 99, 132, 0.8)",
  //       hoverBorderColor: "rgba(255, 99, 132, 1)",
  //       data: sampleFeesDues.map((dues) => dues.amountDue)
  //     }
  //   ]
  // };

  return (
    <div className="dashboard">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="cards">
          <div className="Dashboard-card-container">
            <DashboardCard
              takeme="/studentDeepDetails/all/all"
              count={studentCount}
              heading="Students"
              subHeading="Total Students"
              backgroundColor="#bde0fe"
              backgroundImage="https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Student-3-1024.png"
            />
            <DashboardCard
              heading="Classes"
              count={classCount}
              subHeading="Total Classes"
              backgroundColor="#fcd5ce"
              backgroundImage="http://getdrawings.com/free-icon/classroom-icon-png-69.png"
            />
            <DashboardCard
              heading="Sections"
              count={sectionCount}
              subHeading="Total Sections"
              backgroundColor="#74c69d"
              backgroundImage="https://cdn0.iconfinder.com/data/icons/learning-icons-rounded/110/School-512.png"
            />
            <DashboardCard
              heading="Payments"
              count={totalPayments}
              subHeading="Total Payments"
              backgroundColor="#dee2e6"
              backgroundImage="https://icon-icons.com/icons2/474/PNG/512/wallet_46876.png"
            />
          </div>
          {/* Fees Dues Chart */}
          <div className="chart">
            {chartData && <BarChart chartData={chartData} />}
            <div className="Recent-Transactions-Table">
              <h3 style={{ textDecoration: "underline" }}>
                Recent Transactions
              </h3>
              <Table className="table table-striped table-hover">
                <Thead>
                  <Tr>
                    <Th scope="col">Admission No.</Th>
                    <Th scope="col">Amount</Th>
                    <Th scope="col">Transaction Id</Th>
                    <Th scope="col">Date</Th>
                    <Th scope="col">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recentTransactions &&
                    recentTransactions.map((transaction) => (
                      <Tr key={transaction.TransactionID}>
                        <Td>{transaction.AdmissionNo}</Td>
                        <Td>{transaction.Amount}</Td>
                        <Td>{transaction.TransactionID}</Td>
                        <Td>{transaction.Date}</Td>
                        <Td>
                          <FaFileDownload
                            fontSize={18}
                            style={{ color: "blue" }}
                          />
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
