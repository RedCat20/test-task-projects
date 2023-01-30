import ProjectSchema from "../models/Project.js";
import mongoose from "mongoose";

export const getAllProjects = async (req, res) => {
  let { query, sort, filter } = req.query;
  let sortVal = sort ? sort.split('_') : '';
  const user = req.userId;

  let findObj = {};

  if (filter && filter !== 'all') {
    findObj['date'] = filter;
  }
  if (query) {
    findObj['title'] = new RegExp(query, 'gi')
  }
  if (user) {
    findObj['user'] = mongoose.Types.ObjectId(user);
  }

  try {
    await ProjectSchema
      .find(findObj)
      .sort({ [sortVal[0] || 'title'] : (sortVal[1] === 'asc' ? 1 : -1) })
      .then(projects => res.status(200).json(projects))
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ success: false, err: err });
      });

    } catch (err) {
    console.log('getAllProjects error: ', err);
    return res.status(500).json({ success: false, err: 'Getting all projects server error' });
  }
}


export const addNewProject = async (req, res) => {
  console.log('addNewProject');

  try {
    let { title, description, date } = req.body;

    let newProjectDoc = {
      title,
      description,
      date,
      user: req.userId,
    };

    const doc = new ProjectSchema(newProjectDoc);
    const newProject = await doc.save();
    return res.status(200).json(newProject);

  } catch (err) {
    console.log('getProjectById error: ', err);
    return res.status(500).json({ success: false, err: 'Server error' });
  }
}


export const deleteProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await ProjectSchema.findByIdAndDelete(projectId);

    if (project) {
      return res.status(200).json(project);
    } else {
      return res.status(404).json({success: false, err:  'Project not found and can not be delete'});
    }

  } catch(err) {
    console.log('deleteProjectById error: ', err);
    return res.status(500).json({ success: false, err: 'Deleting project server error' });
  }
}


export const updateProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;

    let { title, description } = req.body;

    // чомусь вертає минулий, хоча в базі вже є нормальний новий
    const project = await ProjectSchema.findByIdAndUpdate(projectId, { title, description }, {new: true});

    console.log('project: ', project);

    if (project) {
      return res.status(200).json(project);
    } else {
      return res.status(404).json({message: 'Project can not be updated'});
    }
  }
  catch(err) {
    console.log('updateProjectById error: ', err);
    return res.status(500).json({ success: false, err: 'Updating project server error' });
  }
}



export const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await ProjectSchema.findById(projectId);

    if (project) {
      return res.status(200).json(project);
    } else {
      return res.status(404).json({success: false, err: 'Project not found'});
    }

  } catch(err) {
    console.log('getProjectById error: ', err);
    return res.status(500).json({ success: false, err: 'Getting project item server error' });
  }
}
