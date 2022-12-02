import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { ContactsBookIcon } from 'components/common';
import { useAppDispatch, useAppSelector } from 'redux/redux-hooks';
import { selectUserLoggedIn, selectUserName } from 'redux/user/selectors';
import { Link, useNavigate } from 'react-router-dom';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import routes from 'constants/routes';
import { styled, Tooltip } from '@mui/material';
import { userLogout } from 'redux/user/operations';

const ContactsTitle = styled(props => (
  <Typography
    noWrap
    variant="h6"
    {...props}
    sx={{
      mr: 2,
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'inherit',
      textDecoration: 'none',
      cursor: 'pointer',
      ...props.sx,
    }}
  />
))({});

const HeaderAppBar = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(selectUserName);
  const isLoggedIn = useAppSelector(selectUserLoggedIn);

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
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
          <ContactsTitle onClick={navigateTo(routes.HOME)}>
            CONTACTS
          </ContactsTitle>

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

              <Tooltip title="Logout">
                <Button
                  color="warning"
                  variant="contained"
                  sx={{ borderRadius: '50%', p: 1, minWidth: 24 }}
                  onClick={logout}
                >
                  <LogoutRoundedIcon />
                </Button>
              </Tooltip>
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderAppBar;
