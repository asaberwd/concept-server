
const User = require('./../models/user') 

const { validateUser } = require('./../../helper/validate')
const { hashing } = require('../../helper/hashing')

// add new user
exports.addUser = async function(req, res) {

  let error = await validateUser(req.body)

  if(error){
    // when product attr not valid send error object
    console.log(error)
    return res.status(400).json({ error })
  }

  let user = req.body
  let password = hashing(req.body.phone)
  user.password = password
  user.email = [req.body.email]
  user.phone = [req.body.phone]
  let newUser = new User(user)

  newUser.save()
  .then((el)=>{
    console.log(el)
    res.status(200).json({ data: el })
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error: err })

  })

};

// view all users
exports.viewUsers = function(req, res) {
  User.find()
  .then( el =>{
    res.status(200).json({ data : el})
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error : err })
  })
}


// view single user by id
exports.viewSingleUser = function(req, res) {
  let id = req.params.id
  User.findById(id)
  .then( el =>{
    if(!el) return res.status(404).json({error :'user is not exist'})
    res.status(200).json({ data : el})
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error : err })
  })
}

exports.updateUser = function(req, res) {
  let id = req.params.id

  let error = validateUser(req.body)
  if(error){
    // when user attr not valid send error object
    return res.status(400).json({ error })
  }

  let user = req.body
  delete user.password

  User.findOneAndUpdate( {_id : id},{ $set: user } , {new : true})
  .then( pro =>{
    if(!pro) return res.status(404).json({error :'product is not exist'})
    res.status(200).json({ data : pro })
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error : err })
  })
}

exports.updateSalesByCron = function(){
  User.updateMany({ role: 'sales', status:'active'}, { $set:{dailyLead: 0 }})
  .then( res =>{
    console.log(` number of records matches ${res.n} and modified ${res.nModified}`)
  })
  .catch(err =>{
    console.log('err ===', err)
    throw new Error('err')
  })
}

