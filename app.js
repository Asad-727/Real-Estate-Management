import express from "express";

import errorHandler from "./errorHandler.js";

import propertyRoutes from "./routes/propertyR.js";
import buildingRoutes from "./routes/buildingR.js";
import floorRoutes from "./routes/floorR.js";
import unitRoutes from "./routes/unitR.js";
import tenantRoutes from "./routes/tenantR.js";
import contractRoutes from "./routes/contractR.js";
import rentRoutes from "./routes/rentR.js";
import paymentRoutes from "./routes/paymentR.js";
import utilityRoutes from "./routes/utilityR.js";
import maintenanceRoutes from "./routes/maintenanceR.js";
import staffRoutes from "./routes/staffR.js";
import expenseRoutes from "./routes/expenseR.js";
import incomeRoutes from "./routes/incomeR.js";
import reportRoutes from "./routes/reportR.js";
import notificationRoutes from "./routes/notificationR.js";
import invoiceRoutes from "./routes/invoiceR.js";
import userRoutes from "./routes/userR.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Real Estate API is running"
    });
});

app.use("/api/properties", propertyRoutes);
app.use("/api/buildings", buildingRoutes);
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

app.use(errorHandler);

export default app;