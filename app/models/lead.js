/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Lead schema
 */

const LeadSchema = new Schema({
  fullName: { 
    type: String, required:true },
  address:{ 
    type:String},
  country:{ 
    type: String,trim:true, required:true, default:'EG'},
  telephone:{ 
    type: String, trim:true, required:true},
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
    default: Date.now(),
  },
  email: { 
    type: String, default: '' },
    user : { type :Schema.Types.ObjectId, ref : 'User', },
  status:{ 
    type: String, enum:['new', 'accepted', 'follow up', 'no answer', 'wrong number', 'closed', 'not intersted', 'hot'], default:'new'},
  historyState:[{ 
    state: { type: String, enum:['intersted', 'active', 'not intersted']},
    user: { type :Schema.Types.ObjectId, ref : 'User', },
    date: { type : Date, default: Date.now()} }],
  historySales : [{
    user :{type :Schema.Types.ObjectId, ref : 'User'},
    date:{ type : Date, default: Date.now()} }],
  comments:[{
    comment:{ type: String,},
    date:{ type: Date, },
    user :{ type :Schema.Types.ObjectId, ref : 'User'}
  }],
  lead: { type :Schema.Types.ObjectId, ref : 'Lead', },

});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

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