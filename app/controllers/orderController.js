
const Order = require('./../models/order') 
const Joi = require('@hapi/joi');

const { validateProduct } = require('./../../helper/validate')


exports.addOrder = function(req, res) {

  // validate order attr
  

  const { orderProducts, company, shipping, area, gov  } = req.body

  let order = {
    user : "5d80decb8aadc50049f28edc",
    lead : "5d7df9c3751b170036ef06f4",
    products: [],
    cost : 0,
    shippingCompany: company,
    fullAddress: req.body.fulladdress,
    shippingCompany: req.body.company,
  }

  let allIds = []
  let total = 0

  for(let i = 0; i< orderProducts.length;i++){    

    allIds[i] = mongoose.Types.ObjectId(orderProducts[i].productId)
    order.products[i] = {
      product : orderProducts[i].productId,
      name : orderProducts[i].name,
      quantity : orderProducts[i].quantity,
      price : orderProducts[i].price
    }
    total += orderProducts[i].total
  }


  // get all products in order from db
  Order.find({
    '_id': { $in: allIds}
  })
  .then( ()=>{

  })
  .catch(err =>{
    console.log('err')
  })

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

