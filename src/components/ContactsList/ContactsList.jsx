import { ContactCard, EditForm } from 'components';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { editContact, removeContact } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';
import { useAppDispatch, useAppSelector } from 'redux/redux-hooks';
import css from './ContactsList.module.css';

const ContactsList = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const [editData, setEditData] = useState({});
  const remove = useCallback(
    id => {
      dispatch(removeContact(id));
    },
    [dispatch]
  );

  const onEdit = useCallback(contact => {
    setEditData(contact);
  }, []);

  const submitEdit = contact => {
    dispatch(editContact({ id: editData.id, ...contact }));
    setEditData({});
  };

  const onClose = useCallback(() => setEditData({}), []);
  return (
    <div className={css.container}>
      <EditForm
        contactName={editData.name}
        contactNumber={editData.number}
        onClose={onClose}
        open={Boolean(editData.id)}
        buttonTitle="Edit"
        title="Edit Contact"
        onEdit={submitEdit}
      />
      {contacts.map(({ name, number, id }) => (
        <ContactCard
          name={name}
          number={number}
          id={id}
          key={id}
          onRemove={remove}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ContactsList;
