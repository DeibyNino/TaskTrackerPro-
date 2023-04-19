import { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  newTask,
  getTask,
  updateTask,
  deleteTask,
  changeStateTask,
} from "../controllers/taskController.js";

const router = Router();

router.post("/", checkAuth, newTask);
router
  .route("/:idTask")
  .get(checkAuth, getTask)
  .put(checkAuth, updateTask)
  .delete(checkAuth, deleteTask);
router.post("/state/:idtask", checkAuth, changeStateTask);

export default router;
