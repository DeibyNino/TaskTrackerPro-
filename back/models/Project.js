import mongoose from "mongoose";

const projectsSchema = mongoose.Schema(
  {
    nameProject: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    dueDate: {
      type: Date,
      default: Date.now(),
    },
    client: {
      type: String,
      trim: true,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId, // me indica que se tomara como tipo el id del usuario guardado en la db
      ref: "User", // Relaciona el Schema donde se tomara el ID como queda guardado en el modelo ./User.js l-52
    },
    pertners: [
      {
        type: mongoose.Schema.Types.ObjectId, // me indica que se tomara como tipo el id del usuario guardado en la db
        ref: "User", // Relaciona el Schema donde se tomara el ID como queda guardado en el modelo ./User.js l-52
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectsSchema);

export default Project;
