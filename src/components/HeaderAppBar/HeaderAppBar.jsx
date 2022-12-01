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
      display: { xs: 'none', md: 'flex' },
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'inherit',
      textDecoration: 'none',
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
      navigate(to);

  const logout = () => dispatch(userLogout());

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <ContactsBookIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <ContactsTitle xs={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to={routes.HOME}>CONTACTS</Link>
          </ContactsTitle>
          {isLoggedIn ? null : (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map(({ title, to }) => (
                  <MenuItem key={title} onClick={handleCloseNavMenu}>
                    <Link to={to}>
                      <Typography textAlign="center">{title}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <ContactsBookIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />

          <ContactsTitle
            sx={{
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <Link to={routes.HOME}>CONTACTS</Link>
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
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  display: { xs: 'none', md: 'block' },
                  textTransform: 'capitalize',
                  mr: 2,
                }}
              >
                Welcome, {userName}
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
