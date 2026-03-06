import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { token, user } = useAuth();

  if (!token || !user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};
