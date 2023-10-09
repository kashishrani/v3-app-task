const { check, validationResult } = require('express-validator');

const validateDate = check('deadline')
  .isDate({ format: '%Y-%m-%d' })
  .withMessage('The date field must be a valid date in the format YYYY-MM-DD');

module.exports = validateDate;