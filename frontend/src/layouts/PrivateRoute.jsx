import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { RotateSpinner } from "react-spinners-kit";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const PrivateRoute = () => {
  const { auth, loading } = useAuth();
  console.log(loading, auth);
  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center bg-slate-400">
        <RotateSpinner />
      </div>
    );
  return (
    <>
      {auth._id ? (
        <div className="bg-gray-100">
          <Header />
          <div className="md:flex md:min-h-screen">
            <SideBar />
            <main className="flex-1 p-10">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default PrivateRoute;
