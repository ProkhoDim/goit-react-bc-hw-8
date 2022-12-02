import { Box, Button, Divider, Typography } from '@mui/material';
import { ReactComponent as PeopleIcon } from 'assets/bacdrop.svg';
import { BackgroundContainer } from 'components';
import { MonospaceTitle } from 'components/common';
import routes from 'constants/routes';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <BackgroundContainer
      backgroundIcon={<PeopleIcon />}
      sx={{ width: 'auto', maxWidth: 'fit-content', alignItems: 'center' }}
    >
      <MonospaceTitle variant="h4">Welcome to Contacts app</MonospaceTitle>
      <Box display="flex" justifyContent="space-evenly">
        <Button variant="contained" onClick={() => navigate(routes.LOGIN)}>
          Login
        </Button>
        <Divider
          variant="middle"
          orientation="vertical"
          flexItem
          sx={{ mx: 2 }}
        />
        <Button variant="outlined" onClick={() => navigate(routes.SIGNUP)}>
          Sign Up
        </Button>
      </Box>
    </BackgroundContainer>
  );
};

export default HomePage;
