import { Button, TextField, Typography } from '@mui/material';
import { BackgroundContainer } from 'components';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from 'redux/redux-hooks';
import { userLogIn } from 'redux/user/operations';
import { selectUserRefreshing } from 'redux/user/selectors';
import { loginValidation } from 'utils/validation';
import { ReactComponent as SigninIcon } from 'assets/signin.svg';

const initialValues = { email: '', password: '' };

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectUserRefreshing);
  const { handleSubmit, errors, values, touched, handleChange, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: loginValidation,
      onSubmit: async values => {
        dispatch(userLogIn(values));
      },
    });

  const fields = [
    { label: 'Email', placeholder: 'example@email.com', name: 'email' },
    { label: 'Password', type: 'password', name: 'password' },
  ];

  return (
    <BackgroundContainer loading={isLoading} backgroundIcon={<SigninIcon />}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 500,
          color: '#1976d2',
          textShadow: '2px 2px 3px rgba(0,0,100,0.3)',
        }}
      >
        Log In
      </Typography>
      <Typography>Fill your email and password to log in</Typography>
      <form onSubmit={handleSubmit} className="login-signup-form">
        {fields.map(field => (
          <TextField
            key={field.name}
            {...field}
            value={values[field.name]}
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors[field.name]) && touched[field.name]}
            helperText={errors[field.name]}
            style={{ borderRadius: 8 }}
          />
        ))}
        <Button type="submit" variant="contained">
          Log In
        </Button>
      </form>
    </BackgroundContainer>
  );
};

export default LoginPage;
