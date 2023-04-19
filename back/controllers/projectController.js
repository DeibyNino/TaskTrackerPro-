import Project from "../models/Project.js";
import Task from "../models/Tasks.js";

/**
 * This function creates a new project instance with data from the request body and saves it to the
 * database.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc. It is
 * passed as the first parameter to the newProject function.
 * @param res - `res` is the response object that is used to send a response back to the client who
 * made the request. It contains methods such as `json()` to send a JSON response, `send()` to send a
 * plain text response, and `status()` to set the HTTP status code of the response
 */
const newProject = async (req, res) => {
  const project = new Project(req.body); // instancia del nuevo projecto con los datos que vienen del body
  project.owner = req.user._id;

  try {
    const saveProject = await project.save();
    res.json({ saveProject });
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function retrieves all projects owned by the user making the request and sends them as a JSON
 * response.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client to
 * the server. It contains information about the request such as the request method, headers, URL, and
 * any data sent in the request body.
 * @param res - `res` is the response object that is sent back to the client after the server has
 * processed the request. It contains information such as the status code, headers, and the response
 * body. In this case, the response body is a JSON object containing the projects that belong to the
 * user making the request
 */
const getProjects = async (req, res) => {
  console.log(req.user._id);
  const projects = await Project.find().where("owner").equals(req.user);
  res.json({ projects });
};

/**
 * This function retrieves a project by its ID and checks if the user has permission to access it.
 * @param req - The request object, which contains information about the incoming HTTP request such as
 * headers, parameters, and body.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods such as `json()` to send a JSON response, `send()` to send a plain
 * text response, and `status()` to set the HTTP status code of the response.
 * @returns The function `getProject` returns a JSON response with the project object if it exists and
 * the user has permission to access it. If the project does not exist or the user does not have
 * permission, it returns a JSON response with an error message and an appropriate status code (404 or
 * 401).
 */
const getProject = async (req, res) => {
  const { idProject } = req.params;

  try {
    const project = await Project.findById(idProject.toString());

    if (!project) {
      const error = new Error("Este Proyecto no existe");
      return res.status(404).json({ msg: error.message });
    }
    if (project.owner.toString() !== req.user._id.toString()) {
      const error = new Error(
        "No tienes permisos para acceder a este proyecto"
      );
      return res.status(401).json({ msg: error.message });
    }

    //consultar las tareas del proyecto
    const tasks = await Task.find().where("project").equals(idProject);

    return res.json({ project, tasks });
  } catch (e) {
    const error = new Error("Este Proyecto no existe");
    return res.status(404).json({ msg: error.message });
  }
};

/**
 * This function edits a project if the user has permission to do so.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods such as `json()` to send a JSON response, `send()` to send a plain
 * text response, and `status()` to set the HTTP status code of the response.
 * @returns a JSON response with the saved project data if the project exists and the user has
 * permission to edit it. If the project does not exist or the user does not have permission, it
 * returns a JSON response with an error message.
 */
const editProject = async (req, res) => {
  const { idProject } = req.params;

  try {
    const project = await Project.findById(idProject);
    if (!project) {
      const error = new Error("Este Proyecto no existe");
      return res.status(404).json({ msg: error.message });
    }
    if (project.owner.toString() !== req.user._id.toString()) {
      const error = new Error(
        "No tienes permisos para acceder a este proyecto"
      );
      return res.status(401).json({ msg: error.message });
    }

    project.nameProject = req.body.nameProject || project.nameProject;
    project.description = req.body.description || project.description;
    project.dueDate = req.body.dueDate || project.dueDate;
    project.client = req.body.client || project.client;

    const saveProject = await project.save();
    return res.json({ saveProject });
  } catch (e) {
    const error = new Error("Este Proyecto no existe");
    return res.status(404).json({ msg: error.message });
  }
};

/**
 * This function deletes a project from the database if the user has permission to do so.
 * @param req - The request object, which contains information about the incoming HTTP request such as
 * headers, parameters, and body.
 * @param res - The `res` parameter is the response object that will be sent back to the client with
 * the result of the HTTP request. It contains methods to set the status code, headers, and body of the
 * response.
 * @returns a JSON response with a message indicating whether the project was successfully deleted or
 * not. If the project is not found or the user does not have permission to delete it, an error message
 * is returned instead.
 */
const deleteProject = async (req, res) => {
  const { idProject } = req.params;

  try {
    const project = await Project.findById(idProject.toString());

    if (!project) {
      const error = new Error("Este Proyecto no existe");
      return res.status(404).json({ msg: error.message });
    }
    if (project.owner.toString() !== req.user._id.toString()) {
      const error = new Error(
        "No tienes permisos para acceder a este proyecto"
      );
      return res.status(401).json({ msg: error.message });
    }
    await project.deleteOne(); // metodo para eliminar un registro de la DB
    return res.json({ msg: "Proyecto Eliminado con exito" });
  } catch (e) {
    const error = new Error("Este Proyecto no existe");
    return res.status(404).json({ msg: error.message });
  }
};

const addPartner = async (req, res) => {};
const deletePartner = async (req, res) => {};

export {
  getProject,
  getProjects,
  addPartner,
  newProject,
  editProject,
  deletePartner,
  deleteProject,
};
