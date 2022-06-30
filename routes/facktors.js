const express = require('express')

const {authenticated} = require('../middlewares/auth');

const router = express.Router();

router.get('/newfacktor',authenticated,(req,res)=>{
    res.render('newfacktor',{pageTitle: 'ثبت فاکتور جدید', userName: req.user.fullName ,msg: req.flash('messages')})
})

module.exports = router;