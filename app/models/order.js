/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



/**
 * order schema
 */

const OrderSchema = new Schema({
  user:{ 
    type :Schema.Types.ObjectId, 
    ref : 'User'},
  lead:{ 
    type :Schema.Types.ObjectId, 
    ref : 'Lead'},
  products:[{  
    product:{ type :Schema.Types.ObjectId, ref : 'Product' },
    quantity:{ type: Number, required:true },
    name:{ type: String },
    price : {type: Number}
              }],
  createdAt:{ 
    type: Date, 
    default: Date.now() },
  state:{ type: String, trim:true, required:true},
  city : { type: String, trim:true, required:true },
  fullAddress : { type: String, trim:true, required:true },
  sn:{},//will be generated for shipping co
  shippingCost:{ 
    type: Number},
  cost:{ 
    type: Number,
    required: true},
  comments:[{
    comment :{ type: String,},
    date :{ type: Date, default: Date.now },
    user :{ type :Schema.Types.ObjectId, ref : 'User'}
  }],
  status:{ 
    type: String,
    default : 'created',
    enum:['created', 'confirmed', 'shipped', 'delivered','delivered cash collected', 'returned to stock', 'undelivered'] },
  historyState:[{ 
    state: { type: String, enum:['created', 'confirmed', 'shipped', 'delivered','delivered cash collected', 'returned to stock', 'undelivered'] },
    user: { type :Schema.Types.ObjectId, ref : 'User', },
    date: { type : Date, default: Date.now()} }],
  shippingCompany:{ type: Schema.Types.ObjectId, ref: 'ShippingCompany' },

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

let Order = mongoose.model('Order', OrderSchema);
module.exports = Order