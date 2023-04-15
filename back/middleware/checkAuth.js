// custom meddleware que valida i el usuario esta autenticado

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkAuth = async (req, res, next) => {
  let token;
  // valida si existe un token   && verifica si es un token Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // tomamamos el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //decodificamos el token mediente jwt y la key creada

      req.user = await User.findById(decoded.id).select("_id name email"); // consulto en la DB y retorna id name y email asignamos los datos a req.user
      return next();
    } catch (error) {
      return res.status(404).json({ msg: "Hubo un error" });
    }
  }

  if (!token) {
    const error = new Error("Token no valido");
    res.status(401).json({ msg: error.message });
  }
  next();
};

export default checkAuth;
