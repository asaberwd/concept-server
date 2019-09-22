/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')


/**
 * user schema
 */

const UserSchema = new Schema({
  name: {
    type: String,
    required : true, 
    trim:true, 
  },
  arabicName: {
    type: String,
    required : true, 
    trim:true, 
  },
  email: [{
    type: String,
    required : true, 
    unique : true, 
    trim : true,
    validate(value) {
    if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')}
    } 
  }],
  role:{
    type: String, 
    enum:['sales', 'leader', 'admin'], 
    default:'sales'
  },
  phone:[{
    type: String,
    required:true,
    trim:true,
    unique:true,
  }],
  password:{
    type: String, 
    required : true, 
    trim :true
  },
  uploads:[{
    type:String,
  }],
  profileImage:{
    type:String
  },
  lastLogin:{
    type:Date
  },
  fingerPrintsCode:{
    type:String,
    trim:true,
  },
  workType:{
    type:String,
    enum:['from-home', 'part-time', 'full-time']
  },
  status:{
    type:String,
    enum:['active', 'resigd', 'terminated']
  },
  docs:{
    pics4:{ type:Boolean, default:false}, pornId:{type:Boolean, default:false },
    id:{type:Boolean}, educational:{type: Boolean}, military:{type:Boolean},
    fingerRecord:{type: Boolean}, heelWork:{type: Boolean}, insurence:{type:Boolean},
  },
  hiringDate:{
    type: Date
  },
  registrationDate:{
    type:Date
  },
  salary:{
    type:Number
  },
  jobTitle:{
    type: String
  },
  manager:{
    type :Schema.Types.ObjectId, ref : 'User'
  },
  project:{
    type: String
  },
  credit:{
    type:Number
  },
  spent:{
    type:Number
  },
  bouns:{
    type: Number
  },
  isfree :{
    type:Boolean
  },
  dailyLead:{
    type:Number
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

UserSchema.method({
  generateAuthToken : async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString(), role:user.role }, process.env.SECRET)

    return token
  },
});

/**
 * Statics
 */

UserSchema.static({
  findByCredentials: async(email, password)=>{
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login pass')
    }

    return user

  },
});

/**
 * Register
 */

let User = mongoose.model('User', UserSchema);
module.exports = User