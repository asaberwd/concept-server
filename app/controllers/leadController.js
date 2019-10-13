
const Lead = require('./../models/lead')
const Call = require('./../models/call')
const User = require('./../models/user') 


const { validateLead } = require('./../../helper/validate')
const fs = require('fs')
const xlsx = require("xlsx")
const path = require('path');

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

exports.uploadExelLeads = function(req,res){
  let file_path = req.file.path
  
  let ext = path.extname(file_path)

  if(ext!='.xlsx')
  {
    res.status(400).json({error : 'error with File extention'})
  }

  //console.log(ext)
  //console.log(req.file)
  
  let leadsfile = xlsx.readFile(file_path)
  let sheet_list = leadsfile.SheetNames
  if (!sheet_list || !sheet_list.length) {
    res.status(400).json({error : 'cant accept empty excel'})
 
  }
  

  let leads = xlsx.utils.sheet_to_json(leadsfile.Sheets[sheet_list[0]])

  if(!leads){
    res.status(400).json({error : 'cant accept empty excel columns'})
    
  }
  let inserted_leads = 0
  for(let k =0 ; k < leads.length ; k++){

    if('telephone' in leads[k]){
      leads[k]['telephone'] = ''+leads[k]['telephone']

    }
    let error = validateLead(leads[k])
    if(error)
    {
      fs.appendFile('logs/unvaliedexcelleads.log', `${JSON.stringify(leads[k])}
      error is : ${error} \n\n `,
     (err) => {if (err) throw err;})
    }
    else{
      newLead = new Lead(leads[k])
      newLead.save()
      inserted_leads+=1
    }
    
  }
  res.status(200).json({'leads' : inserted_leads})

  //console.log(req)
}

exports.assignLeadtoUser = function(req ,res){

let id = req.body.leadid
let req_user = req.body.user

if(!id){
  res.status(400).json({error:'lead is not exist'})

}
if(!req_user){
  res.status(400).json({error:'User is not exist'})
}
Lead.findOneAndUpdate({_id:id},{user:req_user},{new:true})
.then(led=>{
  if(!led) return res.status(404).json({error:'Lead is not exist'})
  res.status(200).json({data:led})   
})
.catch(err=>{
  console.log(err)
  res.status(400).json({error:err})
})
}

exports.assignMultiLeadstoUser = function(req ,res){
  let leads = req.body.leadsid 
 
  let req_user = req.body.user

if(!leads){
  res.status(400).json({error:'lead is not exist'})

}
if(!req_user){
  res.status(400).json({error:'User is not exist'})
}
  let id
  let success_leads = new Array();
  for(let k =0 ;  k < leads.length ; k++){
    id = leads[k] 
    Lead.findOneAndUpdate({_id:id},{user:req_user},{new:true})
  .then(led=>{
   // console.log(led)
    success_leads.push(led)
  })
  
  }
  console.log(success_leads)
  res.status(200).json({data:success_leads})     
  }
  

