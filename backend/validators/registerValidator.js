import { body } from 'express-validator';

export const registerValidator = [
  body('email','Not valid email format')
    .isEmail(),

  body('passwordWithHash')
    .isLength({ min: 1 })
]
