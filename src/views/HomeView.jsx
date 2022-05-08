import { Link } from 'react-router-dom';
import styles from './Views.module.css';

const HomeView = () => (
  <>
    <h2 className={styles.title}>
      Hi there! <br /> This website is made for you to save contacts in your
      personal account. To save them, you should{' '}
      <Link to="register">register</Link> or
      <Link to="login"> log in </Link> if you already have an account. <br />{' '}
    </h2>
  </>
);

export default HomeView;
