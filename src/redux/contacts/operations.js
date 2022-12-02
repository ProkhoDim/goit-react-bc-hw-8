import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const fetchContacts = createAsyncThunk(
  'contacts/getAllContacts',
  async (_, thunkApi) => {
    try {
      const response = await toast.promise(
        axios.get('/contacts'),
        {
          loading: 'Retrieving your contacts',
          success: null,
          error: 'Something went wrong',
        },
        { success: { style: { display: 'none' } } }
      );
      return response.data;
    } catch (error) {
      return;
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addNew',
  async ({ name = '', number = '' }, thunkApi) => {
    try {
      const response = await toast.promise(
        axios.post('/contacts', { name, number }),
        {
          loading: 'Adding new contact...',
          success: 'Successfuly added!',
          error: 'Something went wrong...',
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async ({ id = 0, ...restOptions }, thunkApi) => {
    try {
      const response = await toast.promise(
        axios.patch(`/contacts/${id}`, restOptions),
        {
          loading: 'Editing contact...',
          success: 'Contact was edited!',
          error: 'Something went wrong...',
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (id = 0, thunkApi) => {
    try {
      const response = await toast.promise(axios.delete(`/contacts/${id}`), {
        loading: 'Deleting contact...',
        success: 'Contact was deleted!',
        error: 'Something went wrong...',
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
