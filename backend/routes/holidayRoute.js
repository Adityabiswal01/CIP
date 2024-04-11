const express = require('express');
const { createAVacation, updateVacation, getAvacation,getAllvacation } = require('../controller/vacationController');
const router = express.Router();

router.post('/createvacation',createAVacation);
router.put('/updaevacation/:id',updateVacation);
router.get('/getavacation/:id',getAvacation);
router.get('/getallvacation',getAllvacation);
module.exports=router;