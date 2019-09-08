/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')


/**
 * order schema
 */

const OrderSchema = new Schema({
  createdBy:{ 
    type :Schema.Types.ObjectId, 
    ref : 'User'},
  lead:{ 
    type :Schema.Types.ObjectId, 
    ref : 'Lead'},
  products:[{  
    product:{ type :Schema.Types.ObjectId, ref : 'Lead' },
    quantity:{ type: Number, required:true },
    name:{ type: String },
              }],
  createdAt:{ 
    type: Date, 
    default: Date.now() },
  calls:[{ 
    date:{ type: Date, default: Date.now() },
    note:{ type:String },
    user :{type :Schema.Types.ObjectId, ref : 'User'}  }],
  sn:{},//will be generated for shipping co
  shippingCost:{ 
    type: Number, required:true},
  cost:{ 
    type: Number,
    required: true},
  comments:[{
    comment:{ type: String,},
    date:{ type: Date, },
    sales :{ type :Schema.Types.ObjectId, ref : 'User'}
  }],
  status:{ 
    type: String, 
    enum:['created', 'confirmed', 'shipped', 'delivered', 'returned', 'canceled', 'cashcollected']},
  historyState:[{ 
    state: { type: String, enum:['created', 'confirmed', 'shipped', 'delivered', 'returned', 'canceled', 'cashcollected'] },
    user: { type :Schema.Types.ObjectId, ref : 'User', },
    date: { type : Date, default: Date.now()} }],
  shippingCompany:{ 
    type:String },

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

OrderSchema.method({
  
});

/**
 * Statics
 */

OrderSchema.static({
  
});

/**
 * Register
 */

mongoose.model('Order', OrderSchema);
