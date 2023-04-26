import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Alerts from "../components/Alerts";
import { postData } from "../api/interceptor";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, email, password, repetirPassword].includes("")) {
      setAlert({
        error: true,
        msg: "All fields are requiered",
      });
      return;
    }
    if (password !== repetirPassword) {
      setAlert({
        error: true,
        msg: "the passwords not match",
      });
      return;
    }
    if (password.length < 6) {
      setAlert({
        error: true,
        msg: "The password requires at least 6 characters",
      });
      return;
    }
    setAlert({});
    //  creando el usuario

    const create = await postData("users", { name, password, email });
    if (create.status === 200) {
      setAlert({ msg: create.data?.msg, error: false });
      setName("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } else {
      setAlert({ msg: create.data?.msg, error: true });
    }
  };
  const { msg } = alert;
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu Cuenta y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {msg && <Alerts alert={alert} />}
      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10 "
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            type="text"
            placeholder="Tu Nombre"
            className="w-full mt-3 p-3 bolder rounded-xl bg-gray-50"
            id="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
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
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Password de registro"
            className="w-full mt-3 p-3 bolder rounded-xl bg-gray-50"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
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
            placeholder="Password de registro"
            className="w-full mt-3 p-3 bolder rounded-xl bg-gray-50"
            id="password2"
            value={repetirPassword}
            onChange={({ target }) => setRepetirPassword(target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
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
          to="/reset-password"
        >
          Olvide mi Password!
        </Link>
      </nav>
    </>
  );
};

export default SignUp;
