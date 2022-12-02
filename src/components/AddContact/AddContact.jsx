import AddIcon from '@mui/icons-material/AddRounded';
import { Fab } from '@mui/material';
import { EditForm } from 'components';
import { useCallback } from 'react';
import { useState } from 'react';
import { addContact } from 'redux/contacts/operations';
import { useAppDispatch } from 'redux/redux-hooks';

const AddContact = () => {
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
    <>
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

      <EditForm
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onEdit={addNewContact}
      />
    </>
  );
};

export default AddContact;
