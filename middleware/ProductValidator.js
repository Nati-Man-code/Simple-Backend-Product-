const Joi = require('joi');

const productValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    category: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details.map((err) => err.message) });
  } else {
    next();
  }
};


module.exports = {
  productValidator,
};
