const express = require('express');
const router = express.Router();
const targetController = require("../controllers/targetsController");


//  POST /api/targetroutes →  Set current month and year
router.post('/setTargetmonth', targetController.setMonthTarget);
router.post('/setIncentive', targetController.setIncentive);



module.exports = router; 