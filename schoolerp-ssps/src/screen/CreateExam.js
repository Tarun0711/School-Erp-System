import React, { useState } from "react";
import { BASE_URL } from "../appconfig";
import "../Css/AddStudent.css";
import { toast } from "react-toastify";
// import IdCardAccordian from '../components/reuse/IdCardAccordian';
import { MdDelete, MdEdit } from "react-icons/md";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";



const CreateExam = () => {

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  

  };

  const [examName, setExamName] = useState("");
  const [examDates, setExamDates] = useState([
    {
      date: "",
      sittings: [
        {
          sittingTime: "",
          examTitle: "",
          classRangeFrom: "",
          classRangeTo: "",
        },
      ],
    },
  ]);

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  const handleAddSitting = (index) => {
    const newExamDates = [...examDates];
    newExamDates[index].sittings.push({
      sittingTime: "",
      examTitle: "",
      classRangeFrom: "",
      classRangeTo: "",
    });
    setExamDates(newExamDates);
  };

  const handleAddDate = () => {
    setExamDates([
      ...examDates,
      {
        date: "",
        sittings: [
          {
            sittingTime: "",
            examTitle: "",
            classRangeFrom: "",
            classRangeTo: "",
          },
        ],
      },
    ]);
  };
  const handleChangeDate = (index, value) => {
    const newExamDates = [...examDates];
    newExamDates[index].date = value;
    setExamDates(newExamDates);
  };

  const handleChangeSitting = (dateIndex, sittingIndex, field, value) => {
    const newExamDates = [...examDates];
    newExamDates[dateIndex].sittings[sittingIndex][field] = value;
    setExamDates(newExamDates);
  };

  const handleRemoveSitting = (dateIndex, sittingIndex) => {
    const newExamDates = [...examDates];
    newExamDates[dateIndex].sittings.splice(sittingIndex, 1);
    setExamDates(newExamDates);
  };

  const handleRemoveDate = (index) => {
    const newExamDates = [...examDates];
    newExamDates.splice(index, 1);
    setExamDates(newExamDates);
  };
  const handleClearAll = () => {
    setExamName("");
    setExamDates([
      {
        date: "",
        sittings: [
          {
            sittingTime: "",
            examTitle: "",
            classRangeFrom: "",
            classRangeTo: "",
          },
        ],
      },
    ]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      examName: examName,
      examDates: examDates.map((date) => ({
        date: date.date,
        sittings: date.sittings.map((sitting) => ({
          sittingTime: sitting.sittingTime,
          examTitle: sitting.examTitle,
          classRange: {
            from: sitting.classRangeFrom,
            to: sitting.classRangeTo,
          },
        })),
      })),
    };

    try {
      const response = await fetch(`${BASE_URL}api/sitting/sittingPlans`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      if (response.ok) {
        notifySuccess("Sitting plan created successfully!");
        handleClearAll();
      } else {
        notifyError("Error: " + result.message);
      }
    } catch (error) {
      notifyError("Error: " + error.message);
    }
  };
  return (
    <Box style={{ overflowY: "scroll" }} sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box style={{ background: "white" }} sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab style={{ background: "white" }} label="Exams" value="1" />
            <Tab style={{ background: "white" }} label="Add New Exam" value="2" />
          </TabList>
        </Box>
        <TabPanel value="2">

    <div
      style={{
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <form
        style={{ display: "flex", flexWrap: "wrap" }}
        className="form-control"
        onSubmit={handleSubmit}
      >
        <label>
          Exam Name:
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        {examDates.map((examDate, dateIndex) => (
          <div key={dateIndex}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label>
                Exam Date:
                <input
                  type="date"
                  className="form-control-feild"
                  value={examDate.date}
                  onChange={(e) => handleChangeDate(dateIndex, e.target.value)}
                  required
                />
              </label>
              <button
                style={{ background: "red" }}
                type="button"
                onClick={() => handleRemoveDate(dateIndex)}
              >
                <MdDelete />
              </button>
            </div>
            <br />
            <br />
            {examDate.sittings.map((sitting, sittingIndex) => (
              <div key={sittingIndex}>
                <label>
                  Sitting Time:
                  <input
                    className="form-control-feild"
                    type="text"
                    value={sitting.sittingTime}
                    onChange={(e) =>
                      handleChangeSitting(
                        dateIndex,
                        sittingIndex,
                        "sittingTime",
                        e.target.value
                      )
                    }
                    required
                  />
                </label>
                <br />
                <br />
                <label>
                  Exam Title:
                  <input
                    className="form-control-feild"
                    type="text"
                    value={sitting.examTitle}
                    onChange={(e) =>
                      handleChangeSitting(
                        dateIndex,
                        sittingIndex,
                        "examTitle",
                        e.target.value
                      )
                    }
                    required
                  />
                </label>
                <br />
                <br />
                <label>
                  Class Range From:
                  <input
                    className="form-control-feild"
                    type="text"
                    value={sitting.classRangeFrom}
                    onChange={(e) =>
                      handleChangeSitting(
                        dateIndex,
                        sittingIndex,
                        "classRangeFrom",
                        e.target.value
                      )
                    }
                    required
                  />
                </label>
                <br />
                <br />
                <label>
                  Class Range To:
                  <input
                    className="form-control-feild"
                    type="text"
                    value={sitting.classRangeTo}
                    onChange={(e) =>
                      handleChangeSitting(
                        dateIndex,
                        sittingIndex,
                        "classRangeTo",
                        e.target.value
                      )
                    }
                    required
                  />
                </label>
                <button
                  style={{ background: "red" }}
                  type="button"
                  onClick={() => handleRemoveSitting(dateIndex, sittingIndex)}
                >
                  <MdDelete />
                </button>
                <br />
                <br />
              </div>
            ))}
            <button type="button" onClick={() => handleAddSitting(dateIndex)}>
              Add Sitting
            </button>
            <br />
            <br />
          </div>
        ))}
        <button type="button" onClick={handleAddDate}>
          Add Exam Date
        </button>
        <br />
        <br />
        <button type="submit">Create Sitting Plan</button>
      </form>
    </div>
    </TabPanel>
    <TabPanel value="1">
          <Table style={{ background: "white" }}>
            <Thead>
              <Tr>
                <Th>Fee Structure</Th>
                <Th>Class</Th>
                <Th>Fee Groups (amount)</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* {exams && exams.map((data) => (
                <Tr key={data._id}>
                  <Td>{data.name}</Td>
                  <Td>{data?.class?.name}</Td>
                  <Td>
                  {data?.feeGroups.map((group, index) => (
                   <>
                   {group.feeType}{"("}{group.amount}{")"}
                   {index !== data.feeGroups.length - 1 ? ", " : ""}
                   </> 
                  ))}
                  </Td>
                  
                  <Td>
                    <MdDelete
                      style={{
                        background: "red",
                        borderRadius: "100%",
                        color: "white",
                        padding: "2px",
                        cursor: "pointer",
                        margin: "10px",
                      }}
                      fontSize={28}
                      // onClick={() => handleDelete(data._id)}
                    />
                    <MdEdit
                      style={{
                        background: "green",
                        borderRadius: "100%",
                        color: "white",
                        padding: "2px",
                        cursor: "pointer",
                        margin: "10px",
                      }}
                      fontSize={28}
                      // onClick={() => handleEdit(data)}
                    />
                  </Td>
                </Tr>
              ))} */}
            </Tbody>
          </Table>
          </TabPanel>
    </TabContext>
    </Box>
  );
};

export default CreateExam;
