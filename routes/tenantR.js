const express = require("express");

const {
    getTenants,
    createTenant
} = require("../controllers/tenantC.js");

const router = express.Router();

router.get("/", getTenants);

router.post("/", createTenant);

module.exports = router;