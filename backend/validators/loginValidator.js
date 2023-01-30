import { body } from 'express-validator';

export const loginValidator = [
    body('email','Not valid email format')
        .isEmail(),

    body('passwordWithHash')
        .isLength({ min: 1 }),
]