import { useSelector } from 'react-redux';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from './components/AppBar/AppBar.jsx';
import RequireAuth from './components/RequireAuth/RequireAuth.jsx';
import PublicRoute from './components/PublicRoute/PublicRoute.jsx';
import { getUserStatus } from './redux/auth/auth-selectors';
import styles from './App.module.css';

const HomeView = lazy(() =>
  import('./views/HomeView' /* webpackChunkName: "home" */),
);
const RegisterView = lazy(() =>
  import('./views/RegisterView' /* webpackChunkName: "register" */),
);
const LoginView = lazy(() =>
  import('./views/LoginView' /* webpackChunkName: "login" */),
);
const ContactsView = lazy(() =>
  import('./views/ContactsView' /* webpackChunkName: "contacts" */),
);

export default function App() {
  const isLoggedIn = useSelector(getUserStatus);
  return (
    <>
      <AppBar />
      <Suspense
        fallback={
          <>
            <p className={styles.loading}>Loading...</p>
          </>
        }
      >
        <Routes>
          <Route
            element={
              <PublicRoute redirectTo="/contacts" restricted>
                <HomeView />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute redirectTo="/contacts" restricted>
                <RegisterView />
              </PublicRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute redirectTo="/contacts" restricted>
                <LoginView />
              </PublicRoute>
            }
          />
          <Route
            path="contacts"
            element={
              <RequireAuth redirectTo="/">
                <ContactsView />
              </RequireAuth>
            }
          />
          <Route
            path="*"
            element={isLoggedIn ? <ContactsView /> : <HomeView />}
          />
        </Routes>
      </Suspense>
      <ToastContainer autoClose={3000} theme={'colored'} />
    </>
  );
}
