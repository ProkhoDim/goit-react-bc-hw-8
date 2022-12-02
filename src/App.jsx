import { createTheme, ThemeProvider } from '@mui/material';
import { PrivateRoute, PublicRoute } from 'components';
import SharedLayout from 'components/SharedLayout';
import routes from 'constants/routes';
import { ContactsPage, HomePage, LoginPage, SignUpPage } from 'pages';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from 'redux/redux-hooks';
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
              <PrivateRoute
                component={<ContactsPage />}
                redirectTo={routes.HOME}
              />
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
