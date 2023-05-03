import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Alerts from "../components/Alerts";
import { postData } from "../api/interceptor";

const NewPassword = () => {
  const params = useParams();
  const { token } = params;
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert({
        msg: "the password does not  match",
        error: true,
      });
      return;
    }
    if (password.length < 7) {
      setAlert({
        msg: "the password requiere at least seven characters",
        error: true,
      });
      return;
    }

    const savePassword = await postData(`users/rescuepassword/${token}`, {
      password,
    });

    if (savePassword.status === 200) {
      setAlert({
        msg: savePassword.data.msg,
        error: false,
      });
      setPassword("");
      setPassword2("");
    } else {
      setAlert({
        msg: savePassword.data.msg,
        error: true,
      });
    }

    console.log(savePassword);
  };

  const { msg } = alert;

  console.log(password, password2, password.length, password2.length);

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl text-center capitalize">
        Agrega tu nuevo password y continua con tus{" "}
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
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Escribe tu nuevo Password "
            className="w-full mt-3 p-3 bolder rounded-xl bg-gray-50"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        <input
          // disabled={!password && !password2 ? true : false}
          type="submit"
          value="Crear Nuevo Password"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  );
};

export default NewPassword;
