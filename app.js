const express = require("express");


const errorHandler = require("./errorHandler");
const propertyRoutes = require("./routes/propertyR.js")
const buildingRoutes = require("./routes/buildingR.js");
const floorRoutes = require("./routes/floorR.js");
const unitRoutes = require("./routes/unitR.js");
const tenantRoutes = require("./routes/tenantR.js");
const contractRoutes = require("./routes/contractR.js");
const rentRoutes = require("./routes/rentR.js");
const paymentRoutes = require("./routes/paymentR.js");
const utilityRoutes = require("./routes/utilityR.js");
const maintenanceRoutes = require("./routes/maintenanceR.js");
const staffRoutes = require("./routes/staffR.js");
const expenseRoutes = require("./routes/expenseR.js");
const incomeRoutes = require("./routes/incomeR.js");
const reportRoutes = require("./routes/reportR.js");
const notificationRoutes = require("./routes/notificationR.js");
const invoiceRoutes = require("./routes/invoiceR.js");
const userRoutes = require("./routes/userR.js");

const authMiddleware = require("./middleware/authM.js");

const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
     res.json({message: "Real Estate Apl is runnning"});
})

app.use("/api/properties", propertyRoutes);
app.use("/api/buildings", buildingRoutes)
app.use("/api/floors", floorRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/rents", rentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/utilities", utilityRoutes);
app.use("/api/maintenances", maintenanceRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler)

module.exports = app;