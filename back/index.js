//const express = require("express"); forma antigua
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";

// declaracion del servidor
const app = express();
//habilitar la interpretacion de json en el body de las consultas
app.use(express.json());
//inicialiazacion de dotenv para las variables de entorno
dotenv.config();
//se realiza la conexion con la base de datos
connectDB();

//configuracion de cors
//whitelist
const whitelist = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND2_URL,
  process.env.POSTMAN_URL,
];

const corsOptions = {
  //TODO: habilitar la limitacion de cors
  //validacion de cors especificos
  // origin: function (origin, callback) {
  //   console.log(origin);
  //   if (whitelist.includes(origin)) {
  //     //puede ingresarRS
  //     callback(null, true); // se autoriza el acceso con el true
  //   } else {
  //     // no piedes ingresar
  //     callback(new Error("Error de cors"));
  //   }
  // },
  //TODO: deshabilitar todos los origenes
  origin: "*", // permite la peticion de todas las url
};

app.use(cors(corsOptions));

//Routing
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;

//inicializamos el servidor
app.listen(PORT, () => {
  console.log(`servidor en el puerto ${PORT}`);
});
