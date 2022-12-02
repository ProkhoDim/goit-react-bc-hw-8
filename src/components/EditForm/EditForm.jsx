import { Button, Dialog, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useEffect } from 'react';
import { contactValidation } from 'utils/validation';

const EditForm = ({
  open = false,
  onClose = () => {},
  onEdit = () => {},
  contactName = '',
  contactNumber = '',
  title = 'Add New Contact',
  buttonTitle = 'Add',
}) => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: { name: contactName, number: contactNumber },
    validationSchema: contactValidation,
    onSubmit: values => {
      onEdit(values);
      resetForm();
    },
  });

  useEffect(() => {
    setValues({ name: contactName, number: contactNumber });
  }, [contactName, contactNumber, setValues]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          gap: 20,
        }}
      >
        <Typography variant="h6">{title}</Typography>

        <TextField
          fullWidth
          name="name"
          label="Name"
          placeholder="John Smith"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
        />
        <TextField
          fullWidth
          name="number"
          label="Phone Number"
          placeholder="1234567890"
          value={values.number}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.number && Boolean(errors.number)}
          helperText={touched.number && errors.number}
        />
        <Button variant="contained" type="submit">
          {buttonTitle}
        </Button>
      </form>
    </Dialog>
  );
};

export default EditForm;
