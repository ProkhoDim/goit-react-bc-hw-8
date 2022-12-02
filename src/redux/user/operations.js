import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchContacts } from 'redux/contacts/operations';

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
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'user/getCurrent',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.user.token;

    if (!persistedToken) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setToken(persistedToken);
      const user = await axios.get('/users/current');
      thunkAPI.dispatch(fetchContacts());
      return user.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const userLogout = createAsyncThunk('user/logout', () => {
  axios.post('/users/logout');
  removeToken();
  return;
});
