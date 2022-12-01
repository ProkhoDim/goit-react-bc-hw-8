import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentUser,
  userLogIn,
  userLogout,
  userSingUp,
} from './operations';

const initialState = {
  token: '',
  name: '',
  email: '',
  loggedIn: false,
  loading: false,
  error: '',
};

const loginSignupAction = (state, { payload }) => {
  state.loading = false;
  state.loggedIn = true;
  state.token = payload.token;
  state.name = payload.user.name;
  state.email = payload.user.email;
};

const errorHandled = (state, { payload }) => {
  state.loading = false;
  state.loggedIn = false;
  state.error = payload;
};

const startLoading = state => {
  state.loading = true;
};

const user = createSlice({
  initialState,
  name: 'user',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userLogIn.pending, state => {
        state.loading = true;
      })
      .addCase(userLogIn.fulfilled, loginSignupAction)
      .addCase(userLogIn.rejected, errorHandled)
      .addCase(userSingUp.pending, startLoading)
      .addCase(userSingUp.fulfilled, loginSignupAction)
      .addCase(userSingUp.rejected, errorHandled)
      .addCase(getCurrentUser.pending, startLoading)
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.name = payload.name;
        state.email = payload.email;
        state.loggedIn = true;
      })
      .addCase(getCurrentUser.rejected, (_, { payload }) => {
        return { ...initialState, error: payload };
      })
      .addCase(userLogout.pending, () => {
        return { ...initialState };
      });
  },
});

export const userReducer = user.reducer;
