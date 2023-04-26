import React from "react";

const NewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Agrega tu nuevo password y continua con tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10 ">
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Escribe tu nuevo Password "
            className="w-full mt-3 p-3 bolder rounded-xl bg-gray-50"
            id="password"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
          >
            Repetir Password
          </label>
          <input
            type="password"
            placeholder="Repite tu Password"
            className="w-full mt-3 p-3 bolder rounded-xl bg-gray-50"
            id="password2"
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  );
};

export default NewPassword;
