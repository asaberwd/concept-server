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

const ProductSchema = new Schema({
    name:{ 
        type: String, 
        required: true},
    category:{ 
        type: String, 
        enum:['green coffe', 'perfume', 'hair oils' ]},
    count:{ 
        type: Number,
        default: 0},
    updatedBy:[{ 
        updatedBy : { type :Schema.Types.ObjectId, ref : 'User' },
        updatedAt: {type: Date, default: Date.now() } }]
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