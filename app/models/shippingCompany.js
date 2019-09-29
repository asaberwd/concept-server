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
    isActive:{ type: Boolean,required: true, default:true },
    lastUpdated:{ type: Date, default: momentTz().tz('Egypt/Cairo').format() },
    phone:{ type: String,required: true , trim: true, unique: true },
    Cairo:{ type: Number, min: 0 },
    Alexandria:{ type: Number, min: 0 },
    Ismailia:{ type: Number, min: 0 },
    Aswan:{ type: Number, min: 0 },
    Asyut:{ type: Number, min: 0 },
    Luxor:{ type: Number, min: 0 },
    RedSea: { type: Number, min: 0 },
    Beheira: { type: Number, min: 0 },
    BeniSuef:{ type: Number, min: 0 },
    PortSaid:{ type: Number, min: 0 },
    SouthSinai:{ type: Number, min: 0 },
    Giza:{ type: Number, min: 0 },
    Dakahlia:{ type: Number, min: 0 },
    Damietta:{ type: Number, min: 0 },
    Sohag:{ type: Number, min: 0 },
    Suez:{ type: Number, min: 0 },
    Sharqia:{ type: Number, min: 0 },
    NorthSinai:{ type: Number, min: 0 },
    Gharbia:{ type: Number, min: 0 },
    Faiyum:{ type: Number, min: 0 },
    Qalyubia:{ type: Number, min: 0 },
    Qena:{ type: Number, min: 0 },
    KafrElSheikh:{ type: Number, min: 0 },
    Matruh:{ type: Number, min: 0 },
    Monufia:{ type: Number, min: 0 },
    Minya:{ type: Number, min: 0 },
    NewValley:{ type: Number, min: 0 }

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