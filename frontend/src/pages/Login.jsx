import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerts from "../components/Alerts";
import { postData } from "../api/interceptor";
import { RotateSpinner } from "react-spinners-kit";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);

  const { setAuth } = useAuth();

  const handleUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { email, password } = user;
    if ([email, password].includes("")) {
      setAlert({
        msg: "Todos los campos son requeridos",
        error: true,
      });
      setLoading(false);
      return;
    }

    const login = await postData("users/login", user);
    console.log(login);

    if (login.status === 200) {
      setAuth(login.data);
      localStorage.setItem("token", login.data.token);
      setAlert({
        msg: "",
        error: false,
      });
    } else {
      setAlert({
        msg: login.data.msg,
        error: true,
      });
    }
    setLoading(false);
  };

  const { msg } = alert;
  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl text-center capitalize">
        Inicia sesión y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {msg && <Alerts alert={alert} />}
      <form
        className="my-10 bg-white shadow rounded-lg p-10 "
        onSubmit={handleSubmit}
      >
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
            name="email"
            value={user.email}
            onChange={(e) => handleUser(e)}
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
            name="password"
            value={user.password}
            onChange={(e) => handleUser(e)}
          />
        </div>
        {loading ? (
          <div className="flex justify-center items-center bg-sky-700 w-full mb-5  text-white uppercase font-bold rounded-xl hover:bg-sky-800 transition-colors">
            <RotateSpinner color="#fff" />
          </div>
        ) : (
          <input
            className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors"
            type="submit"
            value="Inicial Sesión"
          />
        )}
      </form>
      <nav className="lg:flex lg:justify-between ">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/signup"
        >
          No tienes una cuenta? Regístrate!
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

export default Login;
