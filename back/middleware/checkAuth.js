// custom meddleware que valida i el usuario esta autenticado

import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * This function checks if a valid Bearer token exists in the request headers and decodes it to
 * retrieve user information from the database.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods such as `res.send()`, `res.json()`, `res.status()`, etc. that are
 * used to send the response data and set the response status code.
 * @param next - next is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to move to the next middleware function when the current middleware
 * function has completed its task.
 * @returns If the token is valid and the user is found in the database, the function returns `next()`,
 * which means it passes control to the next middleware function. If there is an error decoding the
 * token or finding the user in the database, it returns a 404 error response. If there is no token, it
 * returns a 401 error response. If none of the above conditions are met, it
 */
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
    return res.status(401).json({ msg: error.message });
  }
  next();
};

export default checkAuth;
