import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    nameTask: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: Boolean,
      default: false,
    },
    dateIniTask: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    dateEndTask: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "Hight"], // permite solo la opciones que contiene el arreglo.
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
