import Project from "../models/Project.js";
import Task from "../models/Tasks.js";

//Controller para la creacion de tareas nuevas

/**
 * This function creates a new task and validates if the project exists and if the user has permission
 * to create tasks in that project.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods such as `json()` to send a JSON response, `send()` to send a plain
 * text response, and `status()` to set the HTTP status code of the response.
 * @returns a JSON response with the saved task data if the project exists and the user has permission
 * to create tasks in it. If the project does not exist or the user does not have permission, it
 * returns a JSON response with an error message and the corresponding status code (404 or 403). If
 * there is an error during the execution of the function, it also returns a JSON response with an
 */
const newTask = async (req, res) => {
  console.log(req.body);
  const { project } = req.body;
  try {
    //validamos si existe el proyecto en la DB
    const findProject = await Project.findById(project);
    if (!findProject) {
      const error = new Error("Este proyecto no Existe");
      return res.status(404).json({ msg: error.message });
    }
    // Validamos si el usuario que crea la tarea es el mismo que creo el proyecto
    if (findProject.owner.toString() !== req.user._id.toString()) {
      const error = new Error(
        "No tienes permisos para crear tareas en este proyecto"
      );
      return res.status(403).json({ msg: error.message });
    }
    // Creamos la tarea en la DB
    const saveTask = await Task.create(req.body);
    res.json(saveTask);
  } catch (e) {
    console.log(e);
    const error = new Error("Este proyecto no Existe");
    return res.status(404).json({ msg: error.message });
  }
};

//Controller para la consulta de una tarea por idTask
/**
 * This function retrieves a task by its ID and checks if the user has permission to access it.
 * @param req - req stands for "request" and it is an object that contains information about the HTTP
 * request that was made, such as the request method, headers, URL, and any data that was sent with the
 * request.
 * @param res - The `res` parameter is the response object that will be sent back to the client with
 * the result of the HTTP request. It contains methods to set the status code, headers, and body of the
 * response.
 * @returns The function `getTask` returns a JSON response with the task object that matches the
 * `idTask` parameter, after checking if the user has permission to access the task's project and if
 * the task exists. If there is an error, it returns a JSON response with an error message and the
 * corresponding status code.
 */
const getTask = async (req, res) => {
  const { idTask } = req.params;

  try {
    //consulta la existencia de la tarea y con populate la cruza con el proyecto asociado y devuelve los dos consultas
    const task = await Task.findById(idTask).populate("project");
    console.log(task);

    if (task.project.owner.toString() !== req.user._id.toString()) {
      const error = new Error(
        "No tienes permisos para acceder a las tareas de este proyecto"
      );
      return res.status(403).json({ msg: error.message });
    }

    if (!task) {
      const error = new Error("Esta tarea no Existe");
      return res.status(404).json({ msg: error.message });
    }
    res.json(task);
  } catch (e) {
    const error = new Error(`hubo un error: ${e}`);
    return res.status(404).json({ msg: error.message });
  }
};

//Controller para la actualizacion de una tarea por id

/**
 * This function updates a task and checks if the user has permission to access it.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request parameters, headers, body, etc.
 * @param res - The "res" parameter is the response object that will be sent back to the client with
 * the updated task or an error message.
 * @returns the updated task object in JSON format if the task exists and the user has permission to
 * access it. If the task does not exist or the user does not have permission, an error message is
 * returned in JSON format.
 */
const updateTask = async (req, res) => {
  const { idTask } = req.params;

  try {
    //consulta la existencia de la tarea y con populate la cruza con el proyecto asociado y devuelve los dos consultas
    const task = await Task.findById(idTask).populate("project");
    console.log(task);

    if (task.project.owner.toString() !== req.user._id.toString()) {
      const error = new Error(
        "No tienes permisos para acceder a las tareas de este proyecto"
      );
      return res.status(403).json({ msg: error.message });
    }

    if (!task) {
      const error = new Error("Esta tarea no Existe");
      return res.status(404).json({ msg: error.message });
    }

    task.nameTask = req.body.nameTask || task.nameTask;
    task.description = req.body.description || task.description;
    task.state = req.body.state || task.state;
    task.dateEndTask = req.body.dateEndTask || task.dateEndTask;
    task.priority = req.body.priority || task.priority;

    const saveTask = await task.save();
    res.json(saveTask);
  } catch (e) {
    const error = new Error(`hubo un error: ${e}`);
    return res.status(404).json({ msg: error.message });
  }
};

//Controller para la eliminacion de una tarea consultando por idTask

/**
 * This function deletes a task from a project and checks if the user has permission to do so.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request parameters, headers, body, etc.
 * @param res - The `res` parameter is the response object that will be sent back to the client with
 * the result of the HTTP request. It contains methods to set the status code, headers, and body of the
 * response.
 * @returns a JSON response with a message indicating whether the task was successfully deleted or if
 * there was an error. If the task is successfully deleted, the message will be "Tarea Eliminada con
 * exito!" and if there was an error, the message will be "hubo un error: [error message]".
 */
const deleteTask = async (req, res) => {
  const { idTask } = req.params;

  try {
    //consulta la existencia de la tarea y con populate la cruza con el proyecto asociado y devuelve los dos consultas
    const task = await Task.findById(idTask).populate("project");
    console.log(task);

    if (task.project.owner.toString() !== req.user._id.toString()) {
      const error = new Error(
        "No tienes permisos para acceder a las tareas de este proyecto"
      );
      return res.status(403).json({ msg: error.message });
    }

    if (!task) {
      const error = new Error("Esta tarea no Existe");
      return res.status(404).json({ msg: error.message });
    }

    await task.deleteOne();

    res.json({ msg: "Tarea Eliminada con exito!" });
  } catch (e) {
    const error = new Error(`hubo un error: ${e}`);
    return res.status(404).json({ msg: error.message });
  }
};
const changeStateTask = async (req, res) => {};

export { newTask, getTask, updateTask, deleteTask, changeStateTask };
