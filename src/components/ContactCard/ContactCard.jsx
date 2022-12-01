import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React from 'react';
import RemoveIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/EditRounded';
import { getColorFromName, getFirstTwoLetters } from 'utils/userNameColor';
import { memo } from 'react';

const ContactCard = ({
  id = 0,
  name = '',
  number = '',
  onRemove = () => {},
  onEdit = () => {},
}) => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          sx={{
            mr: 2,
            bgcolor: getColorFromName(getFirstTwoLetters(name).toUpperCase()),
          }}
        >
          {getFirstTwoLetters(name).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h6">{name}</Typography>
          <Typography>{number}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => onEdit(id, { name, number })}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<RemoveIcon />}
          onClick={() => onRemove(id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default memo(ContactCard);
