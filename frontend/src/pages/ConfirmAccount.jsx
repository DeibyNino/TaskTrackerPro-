import React from "react";

const ConfirmAccount = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y empieza a gestionar tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <div className="my-5">
        <input
          type="submit"
          value="Confirmar Cuenta"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </div>
    </>
  );
};

export default ConfirmAccount;
