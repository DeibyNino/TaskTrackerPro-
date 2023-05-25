import React, { useState } from "react";
import useProjects from "../../hooks/useProjects";
import Alerts from "../Alerts";

const ProjectForm = () => {
  const { showAlert, alert, submitProject } = useProjects();
  const [project, setProject] = useState({
    nameProject: "",
    description: "",
    client: "",
    dueDate: "",
  });

  const handleProject = (e) => {
    e.preventDefault();
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [
        nameProject.trim(),
        description.trim(),
        client.trim(),
        dueDate.trim(),
      ].includes("")
    ) {
      return showAlert({
        msg: "All fields are requiered",
        error: true,
      });
    }
    await submitProject(project);
    setProject({
      nameProject: "",
      description: "",
      client: "",
      dueDate: "",
    });
  };
  const { nameProject, description, client, dueDate } = project;
  const { msg } = alert;
  console.log(project);

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
      onSubmit={handleSubmit}
    >
      {msg && <Alerts alert={alert} />}
      <div className="mt-2">
        <label
          className="text-gray-700  font-bold text-sm "
          htmlFor="nameProject"
        >
          Project Name
        </label>
        <input
          id="nameProject"
          name="nameProject"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="Name Project"
          value={nameProject}
          onChange={(e) => handleProject(e)}
        />
      </div>
      <div className="mt-2">
        <label
          className="text-gray-700  font-bold text-sm "
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="Project Description"
          value={description}
          onChange={(e) => handleProject(e)}
        />
      </div>
      <div className="mt-2">
        <label className="text-gray-700  font-bold text-sm " htmlFor="dueDate">
          Due Date
        </label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          value={dueDate}
          onChange={(e) => handleProject(e)}
        />
      </div>
      <div className="mt-2">
        <label className="text-gray-700  font-bold text-sm " htmlFor="client">
          Client
        </label>
        <input
          id="client"
          name="client"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="Name Client"
          value={client}
          onChange={(e) => handleProject(e)}
        />
      </div>
      <input
        type="submit"
        value="Create"
        className="bg-sky-600 w-full p-3 cursor-pointer transition-colors uppercase font-bold text-white rounded-md mt-5 hover:bg-sky-400"
      />
    </form>
  );
};

export default ProjectForm;
