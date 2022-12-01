import AddIcon from '@mui/icons-material/AddRounded';
import { Button, Dialog, Fab, TextField } from '@mui/material';
import ContactCard from 'components/ContactCard/ContactCard';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import { useState } from 'react';
import {
  addContact,
  editContact,
  removeContact,
} from 'redux/contacts/operations';
import { useAppDispatch, useAppSelector } from 'redux/redux-hooks';
import css from './Contacts.module.css';

const Contacts = () => {
  const contacts = useAppSelector(state => state.contacts.contacts);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: { name: '', number: '' },
    onSubmit: values => {
      if (editId) {
        dispatch(editContact({ id: editId, ...values }));
        setEditId(null)
      } else {
        dispatch(addContact(values));
      }
      setOpen(false);
      resetForm();
    },
  });

  const remove = id => {
    dispatch(removeContact(id));
  };

  const edit = useCallback((id, { name, number }) => {
    setValues({ name, number });
    setEditId(id);
    setOpen(true);
  }, [setValues]);
  return (
    <div style={{ paddingBottom: 24 }}>
      <Fab
        sx={{ position: 'absolute', right: 16, bottom: 16 }}
        color="primary"
        variant="extended"
        onClick={() => setOpen(true)}
      >
        <AddIcon />
        Add Contact
      </Fab>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            gap: 20,
          }}
        >
          <TextField
            fullWidth
            name="name"
            label="Name"
            placeholder="John Smith"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            fullWidth
            name="number"
            label="Phone Number"
            placeholder="1234567890"
            value={values.number}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.number && Boolean(errors.number)}
            helperText={touched.number && errors.number}
          />
          <Button variant="contained" type="submit">
            Add
          </Button>
        </form>
      </Dialog>
      <div className={css.container}>
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            placeContent: 'stretch',
            gap: 20,
          }}
        >
          {contacts.map(({ name, number, id }) => (
            <ContactCard
              name={name}
              number={number}
              id={id}
              key={id}
              onRemove={remove}
              onEdit={edit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
