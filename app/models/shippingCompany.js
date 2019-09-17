/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const momentTz = require('moment-timezone')


/**
 * order schema
 */

const ShippingCompanySchema = new Schema({
    name:{
        type : String,
        trim : true,
        required : true,
    },
    Cairo:{},

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

ShippingCompanySchema.method({
  
});

/**
 * Statics
 */

ShippingCompanySchema.static({
  
});

/**
 * Register
 */

let ShippingCompany = mongoose.model('ShippingCompany', ShippingCompanySchema);
module.exports = ShippingCompany