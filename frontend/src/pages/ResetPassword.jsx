import React from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupera tu acceso y no pierdas tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10 ">
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 bolder rounded-xl bg-gray-50"
            id="email"
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between ">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          ¿Ya tienes una cuenta? inicia sesión!
        </Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/signup"
        >
          No tienes una cuenta? Regístrate!
        </Link>
      </nav>
    </>
  );
};

export default ResetPassword;
