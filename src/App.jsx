import { Route, Routes } from 'react-router-dom';
import SharedLayout from 'components/SharedLayout';
import Contacts from 'pages/Contacts/Contacts';
import routes from 'constants/routes';
import LoginPage from 'pages/LogIn/LoginPage';
import SignUpPage from 'pages/SignUp/SignUpPage';
import HomePage from 'pages/Home/HomePage';
import { createTheme, ThemeProvider } from '@mui/material';
import { PrivateRoute, PublicRoute } from 'components';
import { useAppDispatch } from 'redux/redux-hooks';
import { useEffect } from 'react';
import { getCurrentUser } from 'redux/user/operations';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderRadius: 12,
        },
      },
    },
  },
});

export const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path={routes.HOME} element={<SharedLayout />}>
          <Route
            index
            element={
              <PublicRoute
                component={<HomePage />}
                redirectTo={routes.CONTACTS}
              />
            }
          />
          <Route
            path={routes.CONTACTS}
            element={
              <PrivateRoute component={<Contacts />} redirectTo={routes.HOME} />
            }
          />
          <Route
            path={routes.LOGIN}
            element={
              <PublicRoute
                component={<LoginPage />}
                redirectTo={routes.CONTACTS}
              />
            }
          />
          <Route
            path={routes.SIGNUP}
            element={
              <PublicRoute
                component={<SignUpPage />}
                redirectTo={routes.CONTACTS}
              />
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};
