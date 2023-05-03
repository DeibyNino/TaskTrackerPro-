import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alerts from "../components/Alerts";
import { postData } from "../api/interceptor";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || email.length < 6) {
      setAlert({
        msg: "Requiere email",
        error: true,
      });
      return;
    }
    const sendEmail = await postData("users/rescuepassword", { email });
    console.log(sendEmail);
    if (sendEmail.status === 404) {
      setAlert({
        msg: sendEmail.data.msg,
        error: true,
      });
    }
    if (sendEmail.status === 200) {
      setAlert({
        msg: sendEmail.data.msg,
        error: false,
      });
    }
  };

  const { msg } = alert;
  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl text-center capitalize">
        Recupera tu acceso y no pierdas tus{" "}
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
            onChange={(e) => setEmail(e.target.value)}
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
