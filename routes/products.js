const express = require('express');

const {authenticated} = require('../middlewares/auth');
const Product = require('../model/Product');
const moment = require('jalali-moment');

const router = express.Router()

//@desc new product routes
//* routers get /products/new-product
router.get('/newproduct', authenticated,(req,res)=>{
    res.render('newProduct',{pageTitle:'تعریف محصول جدید', userName:req.user.fullName, msg:req.flash('messages')})
})
router.post('/newproduct',(req,res)=>{
    Product.create({... req.body, user:req.user.id})
    .then(resa=>{
        
        req.flash("messages","عملیات با موفقیت انجام شد")
        res.render('newProduct',{pageTitle:'ثبت محصل جدید', msg:req.flash('messages'), userName:req.user.fullName})
    })
    .catch(errorr=>{
        req.flash("messages","عملیات ناموفق")
        res.render('newProduct',{pageTitle:'ثبت محصل جدید', msg:req.flash('messages'), userName:req.user.fullName})
    })
})

router.get('/', authenticated,(req,res)=>{
    Product.find({})
    .then(resualt =>{
        
        res.render('ProductList',{pageTitle:'محصولات',resualt, userName:req.user.fullName, moment})
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router;