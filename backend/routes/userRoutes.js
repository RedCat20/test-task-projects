import express from "express";

import { registerUser, loginUser, getUser } from "../controllers/UsersCtrl.js";
import { registerValidator, loginValidator } from "../validators/validators.js";
import { handleValidationErrors, checkAuth } from "../middlewares/middlewares.js";


export const router = express.Router();

router.post('/register', registerValidator, handleValidationErrors, registerUser);

router.post('/login', loginValidator, handleValidationErrors, loginUser);

router.get('/user', checkAuth, getUser);