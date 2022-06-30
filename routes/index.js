const express = require('express');

const User = require('../model/User');
const {authenticated} = require('../middlewares/auth');

const router = express.Router();

router.get('/',authenticated,(req,res)=>{
    res.render('index',{pageTitle:"داشبورد مدیریت", userName:req.user.fullName})
})

module.exports = router;