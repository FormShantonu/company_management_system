import { body, param, query, validationResult } from 'express-validator';

// Validation rules for different routes
const validations = {
  createCompany: [
    body('name')
      .trim()
      .notEmpty().withMessage('Company name is required')
      .isLength({ max: 100 }).withMessage('Company name must be less than 100 characters'),
    body('parentCompanyId')
      .optional()
      .isMongoId().withMessage('Invalid parent company ID format')
  ],

  getCompany: [
    param('id')
      .isMongoId().withMessage('Invalid company ID format')
  ],

  createUser: [
    body('name')
      .trim()
      .notEmpty().withMessage('User name is required')
      .isLength({ max: 50 }).withMessage('User name must be less than 50 characters'),
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format')
  ],

  getUser: [
    param('id')
      .isMongoId().withMessage('Invalid user ID format')
  ],

  search: [
    query('query')
      .trim()
      .notEmpty().withMessage('Search query is required')
      .isLength({ min: 2 }).withMessage('Search query must be at least 2 characters')
  ]
};

export default (schema) => {
  if (!validations[schema]) {
    throw new Error(`Validation schema '${schema}' not found`);
  }

  return [
    ...validations[schema],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array().map(err => ({
            param: err.param,
            message: err.msg,
            location: err.location
          }))
        });
      }
      next();
    }
  ];
};