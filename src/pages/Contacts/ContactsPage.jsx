import AddIcon from '@mui/icons-material/AddRounded';
import { Fab } from '@mui/material';
import { ContactsList } from 'components';
import EditForm from 'components/EditForm/EditForm';
import { useCallback } from 'react';
import { useState } from 'react';
import { addContact } from 'redux/contacts/operations';
import { useAppDispatch } from 'redux/redux-hooks';

const ContactsPage = () => {
  const dispatch = useAppDispatch();
  const [showAddDialog, setShowAddDialog] = useState(false);

  const addNewContact = useCallback(
    ({ name, number }) => {
      dispatch(addContact({ name, number }));
      setShowAddDialog(false);
    },
    [dispatch]
  );
  return (
    <div
      style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
    >
      <EditForm
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onEdit={addNewContact}
      />
      <ContactsList />
      <Fab
        sx={{
          position: 'sticky',
          right: 16,
          bottom: 16,
          alignSelf: 'flex-end',
        }}
        color="primary"
        variant="extended"
        onClick={() => setShowAddDialog(true)}
      >
        <AddIcon />
        Add Contact
      </Fab>
    </div>
  );
};

export default ContactsPage;
