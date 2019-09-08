
const Product = require('./../models/product') 
const Joi = require('@hapi/joi');

const { validateProduct } = require('./../../helper/validate')


exports.addProduct = function(req, res) {

  // validate product attr
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(150).required(),
    category: Joi.string().required(),
  })
console.log('pro : ', req.body)
  const result = Joi.validate({ name: req.body.name, category: req.body.category }, schema);

  if(result.error){
    // when product attr not valid send error object
    res.status(400).json({ error: result.error })
  }

  const imgurl = req.file.filename ;

  let product = req.body
  product.images = imgurl
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

