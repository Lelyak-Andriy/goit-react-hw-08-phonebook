import {
  useDeleteContactMutation,
  useEditContactMutation,
} from '../../redux/contacts/contacts-reducer';
import { useState } from 'react';
import { ImBin2, ImPencil, ImCheckmark } from 'react-icons/im';
import { BallTriangle } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import styles from './ContactsList.module.css';

export default function ContactsListItem({ contactId, name, phoneNumber }) {
  const [change, setChange] = useState(false);
  const [contactName, setContactName] = useState(name);
  const [contactNumber, setContactNumber] = useState(phoneNumber);
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const [editContact, { isLoading: isEditing }] = useEditContactMutation();

  const editHandler = () => {
    editContact({
      changedContact: { name: contactName, number: contactNumber },
      contactId,
    });
    setChange(false);
  };

  return (
    <>
      <li className={styles.item}>
        {!change ? (
          <>
            <span className={styles.info}>
              {name}: {phoneNumber}
            </span>
            <button
              className={styles.button}
              type="button"
              onClick={() => setChange(true)}
            >
              {isEditing ? (
                <BallTriangle height="20" width="40" color="beige" />
              ) : (
                <ImPencil />
              )}
            </button>
          </>
        ) : (
          <>
            <input
              className={styles.input}
              name="name"
              value={contactName}
              onChange={e => setContactName(e.target.value)}
            />
            <input
              className={styles.input}
              type="tel"
              name="phone"
              value={contactNumber}
              autoFocus
              onChange={e => setContactNumber(e.target.value)}
            />
            <button
              className={styles.button}
              type="button"
              onClick={() => editHandler()}
            >
              <ImCheckmark />
            </button>
          </>
        )}

        <button
          className={styles.button}
          type="button"
          onClick={() => deleteContact(contactId)}
        >
          {isDeleting ? (
            <BallTriangle height="20" width="40" color="beige" />
          ) : (
            <ImBin2 />
          )}
        </button>
      </li>
    </>
  );
}

ContactsListItem.propTypes = {
  contactId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};
