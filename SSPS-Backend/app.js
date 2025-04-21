// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const config = require('./config/config.js');

const userRoutes = require("./routes/userRoutes.js")
const parentRoutes = require("./routes/parentRoutes.js");
const studentRoutes = require("./routes/studentRoutes.js");
const sectionRoutes = require("./routes/sectionRoutes.js");
const feesType = require("./routes/fee/feeTypeRoutes.js");
const feeStructure = require("./routes/fee/feeStructureRoutes.js");
const classRoutes = require("./routes/classRoutes.js");
const studentFeeProfileRoutes = require('./routes/studentFeeProfileRoutes.js');
const paymentRoutes = require("./routes/paymentRoutes.js")
const sittingPlanRoutes =require('./routes/SeetingPlaneRoutes.js')
// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/student", studentRoutes)
app.use("/api/section", sectionRoutes)
app.use("/api/fee", feesType);
app.use("/api/fee", feeStructure);
app.use("/api/class", classRoutes);
app.use("/api/student", studentFeeProfileRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/sitting", sittingPlanRoutes)

// Database connection
mongoose.connect(config.database.url)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = config.server.port || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
