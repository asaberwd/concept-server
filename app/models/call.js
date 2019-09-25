/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const momentTz = require('moment-timezone')


/**
 * order schema
 */

const CallSchema = new Schema({
    date:{ 
        type: Date, default: Date.now },
    note:{ 
        type:String },
    user:{ 
        type :Schema.Types.ObjectId, ref : 'User' },
    lead:{ 
        type :Schema.Types.ObjectId, ref : 'Lead' },
    order:{ 
        type :Schema.Types.ObjectId, ref : 'Order' },
    oldState: { 
        type: String, enum:[ 'new','closed', 'not intersted','no answer', 'wrong number', 'accepted', 'follow up', 'hot']},
    newState: { 
        type: String, enum:[ 'closed', 'not intersted','no answer', 'wrong number', 'accepted', 'follow up', 'hot']}
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

CallSchema.method({
  
});

/**
 * Statics
 */

CallSchema.static({
  
});

/**
 * Register
 */

let Call = mongoose.model('Call', CallSchema);
module.exports = Call