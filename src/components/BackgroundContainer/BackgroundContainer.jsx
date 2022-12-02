import React from 'react';
import { Backdrop, CircularProgress, Paper } from '@mui/material';

import css from './BackgroundContainer.module.css';
import { Background } from 'components';

/** @param {{children: JSX.Element, loading: boolean, backgroundIcon: JSX.Element, sx: import('@mui/material').SxProps<import('@mui/material').Theme>}} props */
const BackgroundContainer = ({
  children,
  loading = false,
  backgroundIcon = null,
  sx = {},
}) => {
  return (
    <div className={css.wrap}>
      <Backdrop open={loading} style={{ zIndex: 5 }}>
        <CircularProgress />
      </Backdrop>
      <Paper
        elevation={4}
        sx={{ borderRadius: 3, maxWidth: 400, ...sx }}
        className={css.paper}
      >
        {children}
      </Paper>
      <Background>{backgroundIcon}</Background>
    </div>
  );
};

export default BackgroundContainer;
