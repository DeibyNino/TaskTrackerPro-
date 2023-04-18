import { Router } from "express";
import {
  getProjects,
  newProject,
  getProject,
  getTasks,
  addPartner,
  editProject,
  deletePartner,
  deleteProject,
} from "../controllers/projectController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = Router();

router.route("/").get(checkAuth, getProjects).post(checkAuth, newProject);

router
  .route("/:idProject")
  .get(checkAuth, getProject)
  .put(checkAuth, editProject)
  .delete(checkAuth, deleteProject);

router.get("/tasks/:idProject", checkAuth, getTasks);
router.post("/add-partner", checkAuth, addPartner);
router.post("/delete-partner", checkAuth, deletePartner);

export default router;
