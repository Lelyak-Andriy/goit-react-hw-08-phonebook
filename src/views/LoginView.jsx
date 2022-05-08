import { useState } from 'react';
import { useLoginUserMutation } from '../redux/auth/auth-reducer';
import { Link } from 'react-router-dom';
import styles from './Views.module.css';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser] = useLoginUserMutation();

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const userData = { email, password };
    loginUser(userData);
    reset();
  };

  const reset = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Log in</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          E-mail
          <input
            className={styles.input}
            type="email"
            name="email"
            value={email}
            required
            onChange={handleChange}
          />
        </label>

        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            type="password"
            name="password"
            value={password}
            required
            onChange={handleChange}
          />
        </label>

        <button className={styles.button} type="submit">
          Log in
        </button>
        <p className={styles.text}>
          If you don`t have an account, please{' '}
          <Link to="/register">register</Link>
        </p>
      </form>
    </div>
  );
}
