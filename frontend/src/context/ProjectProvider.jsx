import React, { useState, useEffect, createContext } from "react";
import { postDataUser } from "../api/interceptor";
import { useNavigate } from "react-router-dom";

const ProjectsContext = createContext();
const ProjectProvider = ({ children }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState([]);

  //funcion para el manejo de alertas
  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert([]);
    }, 3000);
  };

  // funcion para la creacion del proyecto en la base de datos
  const submitProject = async (project) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    await postDataUser("projects", project);
    setAlert({
      msg: "The project has been create successfully",
      error: false,
    });
    setTimeout(() => {
      setAlert([]);
      navigate("/projects");
    }, 3000);
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, showAlert, alert, submitProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
export { ProjectProvider };
export default ProjectsContext;
