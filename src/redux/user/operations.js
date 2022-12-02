import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchContacts } from 'redux/contacts/operations';
import errorMessageParser from 'utils/errorMessageParser';
import { selectUserToken } from './selectors';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setToken = (token = '') => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const removeToken = () => {
  axios.defaults.headers.common['Authorization'] = '';
};

export const userSingUp = createAsyncThunk(
  'user/signup',
  async ({ name = '', email = '', password = '' }, thunkAPI) => {
    try {
      const user = await axios.post('/users/signup', { name, email, password });
      return user.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const userLogIn = createAsyncThunk(
  'user/login',
  async ({ email = '', password = '' }, thunkAPI) => {
    try {
      const user = await axios.post('/users/login', { email, password });
      setToken(user.data.token);
      thunkAPI.dispatch(fetchContacts());
      return user.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        errorMessageParser(error, 'Wrong credentials')
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'user/getCurrent',
  async (_, thunkAPI) => {
    const persistedToken = selectUserToken(thunkAPI.getState());

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('');
    }

    try {
      setToken(persistedToken);
      const user = await axios.get('/users/current');
      thunkAPI.dispatch(fetchContacts());
      return user.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(errorMessageParser(error));
    }
  }
);

export const userLogout = createAsyncThunk('user/logout', () => {
  axios.post('/users/logout');
  removeToken();
  return;
});
