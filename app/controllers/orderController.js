
const Order = require('./../models/order') 
const Joi = require('@hapi/joi');

const { validateProduct } = require('./../../helper/validate')


exports.addOrder = function(req, res) {

  // validate order attr
  

  if(result.error){
    // when product attr not valid send error object
    res.status(400).json({ error: result.error })
  }

  let order = {
    createdBy: '',
    lead : '',
    products: '',
    status: 'created',
    cost : 0,
    shippingCompany: '',
    shippingCost:0,
  }
  req.body

  newOrder.save()
  .then((el)=>{
    console.log(el)
    res.status(200).json({ data: el })
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error: err })

  })

};

exports.viewProducts = function(req, res) {
  Product.find()
  .then( el =>{
    res.status(200).json({ data : el})
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error : err })
  })
}

exports.viewSingleProduct = function(req, res) {
  let id = req.params.id
  Product.findById(id)
  .then( el =>{
    if(!el) return res.status(404).json({error :'product is not exist'})
    res.status(200).json({ data : el})
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error : err })
  })
}

exports.updateProduct = function(req, res) {
  let id = req.params.id

  let error = validateProduct(req.body.name, req.body.category)
  if(error){
    // when product attr not valid send error object
    return res.status(400).json({ error })
  }
  Product.findOneAndUpdate( {_id : id},{$set: req.body} , {new : true})
  .then( pro =>{
    if(!pro) return res.status(404).json({error :'product is not exist'})
    res.status(200).json({ data : pro })
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error : err })
  })
}

