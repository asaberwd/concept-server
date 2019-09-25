const Call = require('./../models/call')
const Lead = require('./../models/lead')


exports.addCall =  function(req, res){

    let call = new Call(req.body)
    call.save()
    .then( (result)=>{
        Lead.findByIdAndUpdate(req.body.lead, {$set:{ status: req.body.newState }})
        .then(()=>{
            console.log(res)
            res.status(200).json({ data : result })
        })
        
    })
    .catch( err =>{
        console.log(err)
        res.status(400).json({ error : err })
    })
}

exports.viewAllCalls =  function(req, res){
    
}

exports.viewCallsByUser =  function(req, res){
    Call.find().populate('user').populate('order')
    .then((ca)=>{
      res.status(200).json({ data: ca })
    })
}

exports.viewCallsByLead =  function(req, res){
    Call.find({lead: req.params.id}).populate('user')
    .then((ca)=>{
      res.status(200).json({ data : el, calls: ca })
    })
}

exports.viewSingleCall =  function(req, res){
    Call.findById(req.params.id).populate('user').populate('order')
    .then((ca)=>{
      res.status(200).json({ data : el, calls: ca })
    })
}
