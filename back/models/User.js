import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmation: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // crea automaticamente dos columnas mas, la de creado y la de actualizado
);

//este codigo se va a ejecutar antes de almacenar en la BD
//Funcion para Hashear el password
userSchema.pre("save", async function (next) {
  // esta linea valida que si el password ya ha sido hasheado no lo re-hashee
  if (!this.isModified("password")) next();

  //Realiza el hasheo del password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Crear una funcion que compruebe el password

userSchema.methods.passwordVerification = async function (passwordUser) {
  //retorna true o false haciendo una comparacion del password del formulario con el password hasheado con bcrypt
  return await bcrypt.compare(passwordUser, this.password);
};

//se define el modelo
const User = mongoose.model("User", userSchema);
export default User;
