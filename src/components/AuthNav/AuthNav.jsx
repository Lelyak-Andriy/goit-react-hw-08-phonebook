import { NavLink } from 'react-router-dom';
import styles from './AuthNav.module.css';

export default function AuthNav() {
  return (
    <div>
      <NavLink to="/register" className={styles.link}>
        Registration
      </NavLink>
      <NavLink to="/login" className={styles.link}>
        Login
      </NavLink>
    </div>
  );
}
