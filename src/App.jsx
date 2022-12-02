import {
  Box,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { PrivateRoute, PublicRoute } from 'components';
import SharedLayout from 'components/SharedLayout';
import routes from 'constants/routes';
import { ContactsPage, HomePage, LoginPage, SignUpPage } from 'pages';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/redux-hooks';
import { getCurrentUser } from 'redux/user/operations';
import { selectUserRefreshing, selectUserToken } from 'redux/user/selectors';

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
  const token = useAppSelector(selectUserToken);
  const loadingUser = useAppSelector(selectUserRefreshing);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (token && !mount) {
      dispatch(getCurrentUser());
      setMount(true);
    }
  }, [dispatch, token, mount]);

  return (
    <ThemeProvider theme={theme}>
      {token && loadingUser ? (
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="primary" size={60} />
        </Box>
      ) : (
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
      )}
    </ThemeProvider>
  );
};
