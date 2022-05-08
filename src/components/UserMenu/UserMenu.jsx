import { useSelector } from 'react-redux';
import { getUserName } from '../../redux/auth/auth-selectors';
import { useLogoutUserMutation } from '../../redux/auth/auth-reducer';
import styles from './UserMenu.module.css';

export default function UserMenu() {
  const name = useSelector(getUserName);
  const [logoutUser] = useLogoutUserMutation();

  return (
    <div className={styles.container}>
      <span className={styles.name}>Welcome home, {name}!</span>
      <button
        className={styles.button}
        type="button"
        onClick={() => logoutUser()}
      >
        Log out
      </button>
    </div>
  );
}
