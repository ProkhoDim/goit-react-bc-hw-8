import { styled, Typography } from '@mui/material';

const MonospaceTitle = styled(props => (
  <Typography
    {...props}
    sx={{
      mr: 2,
      fontFamily: 'monospace',
      fontWeight: 700,
      color: 'inherit',
      textDecoration: 'none',
      cursor: 'pointer',
      ...props.sx,
    }}
  />
))({});

export default MonospaceTitle;
