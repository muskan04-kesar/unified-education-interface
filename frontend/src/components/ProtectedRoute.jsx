import { Navigate } from "react-router-dom";
import { getRole } from "../auth";

export default function ProtectedRoute({ allowedRoles, children }) {
  const userRole = getRole();

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
