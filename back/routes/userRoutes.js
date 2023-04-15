import { Router } from "express";
import {
  auth,
  confirmation,
  createUser,
  rescuePassword,
  verifiedToken,
  newPassword,
  perfil,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";
const router = Router();

//Autenticacion, Registro y Confirmacion de Usuarios

router.post("/", createUser); //Crea un nuevo usario

router.post("/login", auth); // Login de un Usuario

router.get("/confirmation/:token", confirmation); // Confirmacion de la cuenta mediente el token
router.post("/rescuepassword", rescuePassword); // REcuperar password
router.get("/rescuepassword/:token", verifiedToken); // comprueba token para Definir nuevo  password
router.post("/rescuepassword/:token", newPassword); // comprueba token para Definir nuevo  password
router.get("/perfil", checkAuth, perfil); // comprueba token para Definir nuevo  password

export default router;
