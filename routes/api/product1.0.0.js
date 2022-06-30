const express = require('express');

const Product = require('../../model/Product');


const router = express.Router()

//* desc user api
//- route api/product/1.0.0
router.get('/product/1.0.0',(req,res)=>{
    Product.find({})
    .then((resualt) => {
       res.json(resualt) 
    })
    .catch((err) => {
        res.send(err)
    });
})



module.exports = router