/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')

const momentTz = require('moment-timezone')

/**
 * Lead schema
 */

const LeadSchema = new Schema({
  fullName: { 
    type: String, required:true },
  address:{ 
    type:String},
  country:{ 
    type: String,trim:true, default:'EG'},
  telephone:{ 
    type: String, trim:true, required:true},
  user : { type :Schema.Types.ObjectId, ref : 'User', },
  gender:{ 
    type:String },
  zoneid:{ 
    type: String},
  tr:{ 
    type:String }, //traffic source
  city:{ 
    type:String},
  ref:{}, //refernce
  browser:{},
  os:{}, //operating system
  agt:{},
  domain:{},
  category:{},
  ip:{},
  age:{},
  page_name:{},
  offer:{},
  careier:{},
  cost:{ 
    type:Number, default: 0},
  deleted:{ 
    type:Boolean},
  registerDate:{
    type:Date,
    default: momentTz().tz('Egypt/Cairo').format(),
  },
  email: { 
    type: String, default: '' },
    user : { type :Schema.Types.ObjectId, ref : 'User', },
  status:{ 
    type: String, enum:['new', 'accepted', 'follow up', 'no answer', 'wrong number', 'closed', 'not intersted', 'hot'], default:'new'},
  historyState:[{ 
    state: { type: String, enum:['intersted', 'active', 'not intersted']},
    user: { type :Schema.Types.ObjectId, ref : 'User', },
    date: { type : Date, default: momentTz().tz('Egypt/Cairo').format()} }],
  historySales : [{
    user :{type :Schema.Types.ObjectId, ref : 'User'},
    date:{ type : Date, default: momentTz().tz('Egypt/Cairo').format()} }],
  comments:[{
    comment:{ type: String,},
    date:{ type: Date, },
    user :{ type :Schema.Types.ObjectId, ref : 'User'}
  }],
  lead: { type :Schema.Types.ObjectId, ref : 'Lead', },
  productName: { type :String },


});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

 LeadSchema.pre('save', function(){
  console.log('from pre hooks', typeof(this.user))
  let id = this.user.toString() 
  User.findOne({_id: id})
    .then( u =>{
      u.dailyLead = u.dailyLead?u.dailyLead+1: 1
      return u.save()
     })
     .then((user)=>{
       console.log(`sales:${user._id} has : ${user.dailyLead}`)
     }
     )
    .catch((err)=>{
     console.log('error is : ', err)
     throw new Error('error in lead hooks')
    })

 })

/**
 * Methods
 */

LeadSchema.method({});

/**
 * Statics
 */

LeadSchema.static({});

/**
 * Register
 */

let Lead = mongoose.model('Lead', LeadSchema);
module.exports = Lead