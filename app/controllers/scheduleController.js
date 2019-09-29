const Schedule = require('./../models/schedule')
const Lead = require('./../models/lead')


exports.addSchedule =  function(req, res){

    let schedule = new Schedule(req.body)
    schedule.save()
    .then( (result)=>{

        console.log(result)
        res.status(200).json({ data : result })
    })
    .catch( err =>{
        console.log(err)
        res.status(400).json({ error : err })
    })
}

exports.viewActiveSchedules =  function(req, res){
    
}

exports.viewSingleSchdule =  function(req, res){
    
}

exports.viewActiveUserSchedules =  function(req, res){
    
}

