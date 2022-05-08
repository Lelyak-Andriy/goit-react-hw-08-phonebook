import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserStatus } from '../../redux/auth/auth-selectors';

export default function RequireAuth({ children, redirectTo }) {
  const isLoggedIn = useSelector(getUserStatus);

  if (isLoggedIn) {
    return children;
  }
  return <Navigate to={redirectTo} />;
}
