const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const momentTz = require('moment-timezone')

const MemberShipSchema = new Schema({
    name:{
        type : String,
        trim : true,
        required : true,
    },
    description:{
        type:String , trim:true ,required:true
    },
    type:{type:String , required:true},
    price:{
        type:Number,
        min:0,
        required:true
    },
    period:{
        type:{type:String , default:'day'},
        count:{type:Number, default: 0}
    }
    
})

MemberShipSchema.method({

})


MemberShipSchema.static({
    
})



let MemberShip = mongoose.model('MemberShip' , MemberShipSchema)
module.exports  = MemberShip