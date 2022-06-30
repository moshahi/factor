const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const moment = require('jalali-moment');

const { authenticated } = require('../middlewares/auth');

const User = require('../model/User');

const router = express.Router()

//@desc  user list routes
//* routers get /users
router.get('/', authenticated, (req, res) => {
    User.find({})
        .then(resualt => {
            res.render('userList', { pageTitle: 'لیست کاربران', resualt, userName: req.user.fullName ,moment})
        })
        .catch(err => {
            console.log(err);
        })
})

//@desc new user routes
//* routers get /users/newuser
router.get('/newuser',authenticated,(req, res) => {
    res.render('newUser', { pageTitle: 'تعریف کاربر جدید', userName: req.user.fullName,msg:req.flash('messages') })
})
router.post('/newuser', async (req, res) => {
    try {

        const { fullName, password, mobile, description } = req.body;
        const hash = await bcrypt.hash(password, 10);
        await User.create({ fullName, mobile, password: hash, description })
        .then((result) => {
            req.flash("messages","عملیات با موفقیت انجام شد")
            res.render('newUser', { pageTitle: 'تعریف کاربر جدید',msg:req.flash('messages'),userName: req.user.fullName });
        }).catch((err) => {
            req.flash("messages","عملیات ناموفق")
            res.render('newUser',{pageTitle:'تعریف کاربر جدید', msg:req.flash('messages'), userName:req.user.fullName})
        });
        

    } catch (error) {
        console.log(err);
    }
})

router.get('/login', (req, res) => {
    res.render('login', { pageTitle: "ورود به داشبورد", error: req.flash("error") })
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users/login",
        failureFlash: true
    })(req, res, next)
})

router.get('/logout',authenticated, (req,res)=>{
    req.logout();
    res.redirect('/users/login');
})

module.exports = router;