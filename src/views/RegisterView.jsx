import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/auth/auth-reducer';
import styles from './Views.module.css';

export default function RegisterView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser] = useRegisterUserMutation();

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
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
    const newUser = { name, email, password };
    registerUser(newUser);
    reset();
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Register form</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            required
            onChange={handleChange}
          />
        </label>

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
          Register
        </button>
        <p className={styles.text}>
          Already have an account?<Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
