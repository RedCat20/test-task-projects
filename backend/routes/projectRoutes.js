import express from "express";

import {
  getAllProjects,
  addNewProject,
  deleteProjectById,
  updateProjectById,
  getProjectById
} from "../controllers/ProjectsCtrl.js";

import { checkAuth, handleValidationErrors } from '../middlewares/middlewares.js';
import { projectValidator } from "../validators/projectValidator.js";

export const router = express.Router();

router.get('/projects', checkAuth, getAllProjects);

router.post('/projects', checkAuth, projectValidator, handleValidationErrors, addNewProject);

router.patch('/projects/:id', checkAuth, projectValidator, handleValidationErrors, updateProjectById);

router.delete('/projects/:id', checkAuth, deleteProjectById);


// router.get('/projects/:id', checkAuth, getProjectById);

