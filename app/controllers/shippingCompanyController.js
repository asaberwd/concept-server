
const Company = require('./../models/shippingCompany') 
const Joi = require('@hapi/joi');



exports.addCompany = function(req, res) {
  
  let newCompany = new Company(req.body)

  newCompany.save()
  .then((el)=>{
    console.log(el)
    res.status(200).json({ data: el })
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error: err })

  })

};

exports.viewcompanies = function(req, res) {
  Company.find()
  .then( el =>{
    res.status(200).json({ data : el})
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error : err })
  })
}

exports.viewSingleCompany = function(req, res) {
  let id = req.params.id
  Company.findById(id)
  .then( el =>{
    if(!el) return res.status(404).json({error :'shipping company is not exist'})
    res.status(200).json({ data : el})
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error : err })
  })
}

exports.updateCompany = function(req, res) {
  let id = req.params.id

  
  Company.findOneAndUpdate( {_id : id},{$set: req.body} , {new : true})
  .then( co =>{
    if(!co) return res.status(404).json({error :'company is not exist'})
    res.status(200).json({ data : co })
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error : err })
  })
}

