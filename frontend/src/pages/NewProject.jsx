import React from "react";
import ProjectForm from "../components/Formularios/ProjectForm";

const NewProject = () => {
  return (
    <>
      <h1 className="text-3xl font-black">New Project</h1>
      <div className="mt-10 flex justify-center">
        <ProjectForm />
      </div>
    </>
  );
};

export default NewProject;
