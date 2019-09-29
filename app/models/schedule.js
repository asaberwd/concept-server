/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const momentTz = require('moment-timezone')


/**
 * order schema
 */

const ScheduleSchema = new Schema({
    date:{ 
        type: Date,
        required : true },
    note:{ 
        type:String },
    status:{
        type: String,
        enum : [ 'active', 'archived' ],
        default: 'active'
        },
    createdAt:{
        type: String,
        default: momentTz().tz('Egypt/Cairo').format()
    },
    user:{ 
        type :Schema.Types.ObjectId, ref : 'User' },
    lead:{ 
        type :Schema.Types.ObjectId, ref : 'Lead' },
    order:{ 
        type :Schema.Types.ObjectId, ref : 'Order' }
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

ScheduleSchema.method({
  
});

/**
 * Statics
 */

ScheduleSchema.static({
  
});

/**
 * Register
 */

let Schedule = mongoose.model('Schedule', ScheduleSchema);
module.exports = Schedule