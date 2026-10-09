import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap any element with this to require login (and optionally specific roles).
// Usage: <ProtectedRoute roles={["creator","admin"]}><Dashboard /></ProtectedRoute>
const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
