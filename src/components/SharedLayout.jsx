import { Box, CircularProgress, Container } from '@mui/material';
import React, { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import HeaderAppBar from './HeaderAppBar';

const SharedLayout = () => {
  return (
    <div className="app-container">
      <HeaderAppBar />
      <Container maxWidth="lg" sx={{ flex: 1 }}>
        <Suspense
          fallback={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          }
        >
          <Outlet />
        </Suspense>
      </Container>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SharedLayout;
