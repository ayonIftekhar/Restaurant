import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedRoute(props) {
  const token = sessionStorage.getItem("jwt");

  if (token) {
    return props.children;
  } else {
    toast.warning("Login to continue")
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;
