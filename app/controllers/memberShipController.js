
const MemberShip = require('../models/memberShip')
const Joi = require('@hapi/joi');

const { validateMemberShip } = require('./../../helper/validate')

exports.addMemmberShip  =function(req,res){
    let error = validateMemberShip(req.body)
      if(error){
          res.status(400).json({ err: error })
      }

      let membership = req.body 
      membership.count = parseInt(membership.count)
      membership.period.count = parseInt(membership.period.count)
      let newMembership = new MemberShip(membership)
      
      
      newMembership.save()
      .then((el)=>{
          console.log(el)
          res.status(200).json({ data: el })
        })
        .catch(err =>{
            console.log(err)
            res.status(400).json({ error: err })
  })
}
exports.viewMemberShip = function(req,res){
     MemberShip.find()
     .then( el =>{
       res.status(200).json({ data : el})
     })
     .catch(err =>{
       console.log(err)
       res.status(400).json({ error : err })
     })
}

exports.viewSingleMemberShip = function(req,res){
    let id = req.params.id
    MemberShip.findById(id)
    .then( el =>{
      if(!el) return res.status(404).json({error :'product is not exist'})
      res.status(200).json({ data : el})
    })
    .catch(err =>{
      console.log(err)
      res.status(400).json({ error : err })
    })
}

exports.updateMemberShip = function(req,res){
    let id = req.params.id
     let error = validateMemberShip(req.body)
     if(error){
        return res.status(400).json({ error })
      }
      MemberShip.findOneAndUpdate( {_id : id},{$set: req.body} , {new : true})
        .then( el =>{
            if(!el) return res.status(404).json({error :'MemberShip is not exist'})
            res.status(200).json({ data : el })
        })
        .catch(err =>{
            console.log(err)
            res.status(400).json({ error : err })
  })
}


    


