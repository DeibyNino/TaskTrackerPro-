import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayaout from "./layouts/AuthLayaout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./layouts/PrivateRoute";
import Projects from "./pages/Projects";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Area Publica de la app */}
          <Route path="/" element={<AuthLayaout />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="reset-password/:token" element={<NewPassword />} />
            <Route path="confirm-account/:id" element={<ConfirmAccount />} />
          </Route>
          {/* Area Privada de la App */}
          <Route path="/projects" element={<PrivateRoute />}>
            <Route index element={<Projects />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
