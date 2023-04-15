import jwt from "jsonwebtoken";

const generateJWT = (id) => {
  //retorna la firma del payload que se le pasa al JWT
  return jwt.sign(
    {
      id, // lo que va en el JWT
    },
    process.env.JWT_SECRET, // la llave privada
    {
      //objeto con opciones
      expiresIn: "30d", // tiempo de expiracion del token
    }
  );
};

export default generateJWT;
