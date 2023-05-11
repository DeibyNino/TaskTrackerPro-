import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { RotateSpinner } from "react-spinners-kit";

const PrivateRoute = () => {
  const { auth, loading } = useAuth();
  console.log(loading, auth);
  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center bg-slate-400">
        <RotateSpinner />
      </div>
    );
  return <>{auth._id ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PrivateRoute;
