const joi = require('joi');

const schema = joi.object({
    age: joi.number().min(0).max(100).required(),
    gender: joi.string().valid('male','female')

}).or('age', 'gender');

module.exports = schema;
