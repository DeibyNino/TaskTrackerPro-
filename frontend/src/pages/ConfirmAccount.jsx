import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getData, postData } from "../api/interceptor";
import Alerts from "../components/Alerts";

const ConfirmAccount = () => {
  const params = useParams();
  const { id } = params;
  const [alert, setAlert] = useState(null);
  const [cuentaconfirmada, setCuentaConfirmada] = useState(false);

  const handlkeConfirmation = async () => {
    const confirmation = await postData("users/confirmation", {
      token: id,
    });

    console.log(confirmation);
    if (confirmation.status === 200) {
      setAlert({
        error: false,
        msg: confirmation.data.msg,
      });
      setCuentaConfirmada(true);
    } else {
      setAlert({
        error: true,
        msg: confirmation.data.msg,
      });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y empieza a gestionar tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <div className="my-5 mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alert && <Alerts alert={alert} />}

        {cuentaconfirmada ? (
          <Link
            to="/"
            className="bg-sky-700 w-full block text-center mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors"
          >
            Iniciar sesión
          </Link>
        ) : (
          <button
            onClick={handlkeConfirmation}
            className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors"
          >
            Confirmar Cuenta
          </button>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
