
const Joi = require('@hapi/joi');


exports.validateProduct = (name, category)=>{
  // validate product attr
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(150).required(),
    category: Joi.string().required(),
  })

  const result = Joi.validate({ name, category }, schema);

  return result.error;
  
}

exports.validateUser= (body)=>{

  const { name, arabicName, email, phone } = body
  // validate user attr
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(150).required(),
    arabicName: Joi.string().regex(/^[\u0600-\u06FF\u0750-\u077F ]{7,80}$/).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string().required(),
  })

  const result = Joi.validate({ name, arabicName, email, phone }, schema);

  return result.error
}


// validate lead
exports.validateLead= (body)=>{

  const { fullName, country, telephone } = body
  // validate user attr
  const schema = Joi.object().keys({
    fullName: Joi.string().required(),
    country: Joi.string().required(),
    telephone: Joi.string().required(),
  })

  const result = Joi.validate({ fullName, country, telephone }, schema);

  return result.error
}