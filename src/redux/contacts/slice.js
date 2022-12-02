import { createSlice } from '@reduxjs/toolkit';
import { userLogout } from 'redux/user/operations';
import {
  addContact,
  editContact,
  fetchContacts,
  removeContact,
} from './operations';

const runLoading = state => {
  state.loading = true;
};
const stopLoading = state => {
  state.loading = false;
};

const contacts = createSlice({
  initialState: {
    loading: false,
    contacts: [],
  },
  name: 'contacts',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, runLoading)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.contacts = payload;
      })
      .addCase(fetchContacts.rejected, stopLoading)
      .addCase(addContact.pending, runLoading)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.contacts.push(payload);
      })
      .addCase(addContact.rejected, stopLoading)
      .addCase(editContact.pending, runLoading)
      .addCase(editContact.fulfilled, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          contacts: state.contacts.map(contact =>
            contact.id === payload.id ? payload : contact
          ),
        };
      })
      .addCase(editContact.rejected, stopLoading)
      .addCase(removeContact.pending, runLoading)
      .addCase(removeContact.fulfilled, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          contacts: state.contacts.filter(contact => contact.id !== payload.id),
        };
      })
      .addCase(removeContact.rejected, stopLoading)
      .addCase(userLogout.fulfilled, state => {
        state.loading = false;
        state.contacts = [];
      });
  },
});

export const contactsReducer = contacts.reducer;
