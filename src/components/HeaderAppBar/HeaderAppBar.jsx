import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ContactsBookIcon, MonospaceTitle } from 'components/common';
import routes from 'constants/routes';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/redux-hooks';
import { userLogout } from 'redux/user/operations';
import { selectUserLoggedIn, selectUserName } from 'redux/user/selectors';

const HeaderAppBar = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(selectUserName);
  const isLoggedIn = useAppSelector(selectUserLoggedIn);

  const navigate = useNavigate();
  const pages = isLoggedIn
    ? []
    : [
        { title: 'Log In', to: routes.LOGIN },
        { title: 'Sign Up', to: routes.SIGNUP },
      ];

  const navigateTo =
    (to = '') =>
    () =>
      navigate(to, { replace: true });

  const logout = () => dispatch(userLogout());

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <ContactsBookIcon sx={{ mr: 1 }} />
          <MonospaceTitle
            noWrap
            variant="h6"
            sx={{ letterSpacing: '.3rem' }}
            onClick={navigateTo(routes.HOME)}
          >
            CONTACTS
          </MonospaceTitle>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: isLoggedIn ? 'stretch' : 'flex-end',
            }}
          >
            {pages.map(({ title, to }) => (
              <Button
                key={to}
                onClick={navigateTo(to)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {title}
              </Button>
            ))}
          </Box>

          {isLoggedIn ? (
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                overflow: 'hidden',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  textTransform: 'capitalize',
                  mr: 2,
                  display: 'block',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                <Typography
                  component="span"
                  sx={{ display: { xs: 'none', md: 'inline' } }}
                >
                  Welcome,{' '}
                </Typography>
                {userName}
              </Typography>

              <Button
                color="secondary"
                startIcon={<LogoutRoundedIcon />}
                variant="contained"
                onClick={logout}
              >
                Logout
              </Button>
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderAppBar;
