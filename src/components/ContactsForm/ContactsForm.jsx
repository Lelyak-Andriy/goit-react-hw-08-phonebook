import { useState } from 'react';
import {
  useSaveContactMutation,
  useFetchContactsQuery,
} from '../../redux/contacts/contacts-reducer';
import { BallTriangle } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import warning from '../../helpers/warning';
import error from '../../helpers/error';
import styles from './ContactsForm.module.css';

export default function ContactsForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { data: contacts } = useFetchContactsQuery();
  const [saveContact, { isLoading }] = useSaveContactMutation();

  const handleSubmit = e => {
    e.preventDefault();
    const contact = { name, number };

    const getNameExistence = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

    const getNumberExistence = contacts.find(
      contact => contact.number === number,
    );

    if (getNameExistence) {
      error(name);
      reset();
      return;
    }
    if (getNumberExistence) {
      error(number);
      reset();
      return;
    }
    saveContact(contact);
    warning();
    reset();
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Name
        <input
          className={styles.input}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </label>

      <label className={styles.label}>
        Number
        <input
          className={styles.input}
          type="tel"
          name="phone"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </label>
      {isLoading ? (
        <button className={styles.button}>
          <BallTriangle height="40" width="40" color="beige" />
        </button>
      ) : (
        <button className={styles.button} type="submit">
          Add contact
        </button>
      )}
    </form>
  );
}
