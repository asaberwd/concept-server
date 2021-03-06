
const Lead = require('./../models/lead')
const Call = require('./../models/call')
const User = require('./../models/user') 


const { validateLead } = require('./../../helper/validate')
const fs = require('fs')


// add new lead
exports.addLead = function(req, res) {
    
  let error = validateLead(req.body)

  if(error){
    // append unvalid leads to log file
    fs.appendFile('logs/unvalidleads.log', ` failed to validate , domain : ${req.body.domain}
     error is : ${error}, \n `,
    (err) => {if (err) throw err;})

    // when product attr not valid send error object
    res.status(400).json({ error })
  }

  let newLead

  User.find({role: 'sales'}).sort({dailyLead:1}).limit(1)
  .then((user)=>{

    return User.find({role: 'sales'}).sort({dailyLead:1}).limit(1)

  }).then((u)=>{
    console.log('u ===', u)
    newLead = new Lead(req.body)
    newLead.user = u[0]._id
    userId = u[0]._id 
    return newLead.save()
  })
  .then((el)=>{
    console.log(el)
    res.status(200).json({ data: el })
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error: err })

  })

  /*User.findOneAndUpdate({_id:userId}, { $inc:{dailyLead: 1 }}, {new:true})
  .then((us)=>{
    console.log('user after', us)
  }).catch(err =>{
    console.log('err is :', err)
  })*/
  };


// view all users
exports.viewLeads = function(req, res) {
  Lead.find()
  .then( el =>{
    res.status(200).json({ data : el})
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error : err })
  })
}

// view single user by id
exports.viewSingleLead = function(req, res) {
  let id = req.params.id
  Lead.findById(id).populate('user')
  .then( el =>{
    if(!el) return res.status(404).json({error :'lead is not exist'})
    // get calls associated with lead
    Call.find({lead: id}).populate('user')
    .then((ca)=>{
      res.status(200).json({ data : el, calls: ca })
    })
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json({ error : err })
  })
}