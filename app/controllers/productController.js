
const Product = require('./../models/product') 
const Joi = require('@hapi/joi');


exports.addProduct = function(req, res) {

  // validate product attr
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(150).required(),
    category: Joi.string().required(),
  })

  const result = Joi.validate({ name: req.body.name, category: req.body.category }, schema);

  if(result.error){
    // when product attr not valid send error object
    res.status(400).json({ error: result.error })
  }

  let product = req.body
  let newProduct = new Product(product)

  newProduct.save()
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
  Product.findById(req.params.id)
  .then( el =>{
    res.status(200).json({ data : el})
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error : err })
  })
}

