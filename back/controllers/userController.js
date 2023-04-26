import User from "../models/User.js";
import generateID from "../helpers/generateID.js";
import generateJWT from "../helpers/generateJWT.js";

const createUser = async (req, res) => {
  // evitar registros duplicados
  const { email } = req.body;

  const exist = await User.findOne({ email }); // el metodo findOne busca en la DB si existe el elemento que se pasa como argumento

  if (exist) {
    const error = new Error(`El usuario ${exist.email} ya existe`); //seteo un nuevo error
    return res.status(400).json({ msg: error.message }); // envio como repsuesta el mensaje setado
  }

  try {
    const addUser = new User(req.body); //crea un nuevo usuario con la informacion del modelo
    addUser.token = generateID(); // genera ID aleatorio para el token de verificacion- funcion creada como un helper
    const saveUser = await addUser.save(); // guarda el nuevo usuario en la base de datos
    res.json({
      msg: "Usuario Creado satisfactoriamente, revisa tu email para verificar tu cuenta",
      user: saveUser,
    });
  } catch (error) {
    console.log(`Error en la creacion de usuario: ${error}`);
    res.json({ error: `Error en la creacion de usuario: ${error}` });
  }
};

//Controller para realizar el loguin de un usuario
const auth = async (req, res) => {
  const { email, password } = req.body;
  //comprobar si el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El Usuario no existe crea una cuenta ");
    return res.status(404).json({ msg: error.message });
  }

  //comprobar si el usuario esta confirmado
  if (!user.confirmation) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  //comprobar su password
  console.log(await user.passwordVerification(password), password);
  if (await user.passwordVerification(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("Tu password no coincide");
    return res.status(403).json({ msg: error.message });
  }
};

//Controller para la confirmacion de un usuario
const confirmation = async (req, res) => {
  const { token } = req.params; // destructuramos el token de los parametros de la url
  //verificar si el usuario existe
  const userConfirmation = await User.findOne({ token });
  if (!userConfirmation) {
    const error = new Error("Token no valido");
    return res.status(403).json({ msg: error.message });
  }
  try {
    userConfirmation.confirmation = true; // cambiamos el valor de false a true
    userConfirmation.token = ""; // limpiamos el token ya que es de un solo uso
    await userConfirmation.save(); // guardamos los nuevos datos en la DB
    res.json({ msg: "El usuario ha sido confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

//controller que verifica si el usuario existe y genera un nuevo token para cambiar el password
const rescuePassword = async (req, res) => {
  const { email } = req.body;

  //comprobar si ese usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El Usuario no existe crea una cuenta ");
    return res.status(404).json({ msg: error.message });
  }

  try {
    user.token = generateID(); //genera un nuevo token y lo asigna a user
    await user.save(); // guarda el nuevo token en la DB
    res.json({ msg: "Revisa tu email para cambiar tu password" });
  } catch (error) {
    console.log(error);
  }
};

//Controller que verifica si el token para cambiar el password es correcto
const verifiedToken = async (req, res) => {
  const { token } = req.params;

  //verificar si el usuario existe
  const existeToken = await User.findOne({ token });
  //verifica si el token es valido
  if (!existeToken) {
    const error = new Error("Token no valido");
    return res.status(403).json({ msg: error.message });
  } else {
    return res.json({ msg: "puedes cambiar tu password" });
  }
};

//Controller para crear y guardar el nuevo password

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  //verificar si el usuario existe
  const user = await User.findOne({ token });
  //verifica si el token es valido
  if (user) {
    user.password = password;
    user.token = "";
    try {
      await user.save();
      return res.json({ msg: "Tu password ha sido cambiado correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no valido");
    return res.status(403).json({ msg: error.message });
  }
};

//controller que pasa el perfil del usuario
//
const perfil = async (req, res) => {
  const { user } = req;
  res.json(user);
};
export {
  createUser,
  auth,
  confirmation,
  rescuePassword,
  verifiedToken,
  newPassword,
  perfil,
};
