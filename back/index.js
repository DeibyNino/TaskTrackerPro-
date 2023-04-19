//const express = require("express"); forma antigua
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// declaracion del servidor
const app = express();
//habilitar la interpretacion de json en el body de las consultas
app.use(express.json());
//inicialiazacion de dotenv para las variables de entorno
dotenv.config();
//se realiza la conexion con la base de datos
connectDB();

//Routing
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;

//inicializamos el servidor
app.listen(PORT, () => {
  console.log(`servidor en el puerto ${PORT}`);
});
