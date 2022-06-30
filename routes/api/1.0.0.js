const express = require('express');

const User = require('../../model/User');
const Product = require('../../model/Product');

const router = express.Router()

//* desc user api
//- route api/users/1.0.0
router.get('/users/1.0.0',(req,res)=>{
    User.find({})
    .then((resualt) => {
       res.json(resualt) 
    })
    .catch((err) => {
        res.send(err)
    });
})
//* desc products api
//- route api/products/1.0.0
router.get('/products/1.0.0',(req,res)=>{
    Product.find({})
    .then((resualt) => {
       res.json(resualt) 
    })
    .catch((err) => {
        res.send(err)
    });
})

router.get('/products/1.0.0/:productId',(req,res)=>{
    Product.findById(req.params.productId)
    .then((resualt) => {
       res.json(resualt) 
    })
    .catch((err) => {
        res.send(err)
    });
})


module.exports = router