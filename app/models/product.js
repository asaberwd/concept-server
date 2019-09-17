/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const momentTz = require('moment-timezone')


/**
 * order schema
 */

const ProductSchema = new Schema({
    name:{ 
        type: String, 
        required: true},
    describtion :{
        type: String,
        trim: true,
        required : true,
    },
    category:{ 
        type: String, 
        enum:['green coffe', 'perfume', 'hair oils' ]},
    count:{ 
        type: Number,
        min:0,
        default: 0},
    updatedBy:[{ 
        updatedBy : { type :Schema.Types.ObjectId, ref : 'User' },
        updatedAt: {type: Date, default: momentTz().tz('Egypt/Cairo').format() } }],
    images:{ type:String },
    createdAt : { 
        type:Date,
        default: momentTz().tz('Egypt/Cairo').format()
    },
    price:{
        type:Number,
        min:0,
        required:true
    }

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

ProductSchema.method({
  
});

/**
 * Statics
 */

ProductSchema.static({
  
});

/**
 * Register
 */

let Product = mongoose.model('Product', ProductSchema);
module.exports = Product