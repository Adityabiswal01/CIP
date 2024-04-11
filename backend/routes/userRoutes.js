const express = require('express');
const { userRegistration, userLogin, createSales ,getUserDetails, getalleligibleuser, updateUser } = require('../controller/userController');
const router = express.Router();

router.post("/registration",userRegistration);
router.post("/login",userLogin);
router.put("/createSales/:id",createSales);
router.get("/details/:id",getUserDetails);
router.get("/alleligibleuser",getalleligibleuser);
router.put('/updateuser/:id',updateUser);
//router.get("/checkInsentives",CheckInsentives);
module.exports=router;