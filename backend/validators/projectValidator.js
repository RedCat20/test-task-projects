import { body } from 'express-validator';

export const projectValidator = [
  body('title','Not valid title length  (min 3)')
    .isString()
    .isLength({ min: 3 }),

  body('date','Incorrect date converted string')
    .isString()
    .isLength({ min: 10, max: 10 }),

  body('user','Incorrect user id')
    .notEmpty()
]