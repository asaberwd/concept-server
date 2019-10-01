
const Order = require('./../models/order')
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const { validateProduct } = require('./../../helper/validate')


exports.addOrder = function(req, res) {

  // validate order attr
  

  const { orderProducts, company, shipping, area, gov, leadId } = req.body

  let order = {
    user : "5d80decb8aadc50049f28edc",
    lead : leadId,
    products: [],
    cost : 0,
    shippingCompany: company,
    fullAddress: req.body.fulladdress,
    shippingCompany: req.body.company,
  }

  let allIds = []
  let total = 0

  for(let i = 0; i< orderProducts.length;i++){    

    allIds[i] = orderProducts[i].productId
    order.products.push({
      product : orderProducts[i].productId,
      name : orderProducts[i].name,
      quantity : orderProducts[i].quantity,
      price : orderProducts[i].price
    }) 
    total += orderProducts[i].total
  }


  // get all products in order from db
  //Order.find({
  //  '_id': { $in: allIds}
  //})
  //.then( ()=>{

  //})
  //.catch(err =>{
  //  console.log('err')
  //})

  order.state = gov
  order.city = area
  order.shippingCost = shipping
  order.cost = total + shipping
  order.comments = [ { comment: req.body.comment, user: '5d80decb8aadc50049f28edc'} ]


  let newOrder = new Order(order)

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

exports.viewOrders = function(req, res) {
  Order.find().populate('shippingCompany').populate('user')
  .then( el =>{
    res.status(200).json({ data : el})
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error : err })
  })
}

exports.viewSingleOrder = function(req, res) {
  let id = req.params.id
  Order.findById(id).populate('lead').populate('user').populate('shippingCompany')
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

exports.getStatistics = function(req, res){
  Order.estimatedDocumentCount()
  .then((result)=>{
    res.status(200).json({ data : result })
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error : err })
  })


  
exports.updateOrderStatus = function(req,res){
  let id = req.params.id

  Order.findOneAndUpdate({_id:id},{$set:req.body},{new:true})
  .then(ord=>{
    if(!ord) return res.status(404).json({error:'Order is not exist'})
    res.status(200).json({data:ord})   
  })
  .catch(err=>{
    console.log(err)
    res.status(400).json({error:err})
  })

}

  //db.contest.aggregate([
  //  {"$group" : {_id:"$province", count:{$sum:1}}}
  //])

}

