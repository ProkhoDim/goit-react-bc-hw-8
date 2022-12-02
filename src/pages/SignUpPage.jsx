import { Button, TextField, Typography } from '@mui/material';
import { BackgroundContainer } from 'components';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from 'redux/redux-hooks';
import { userSingUp } from 'redux/user/operations';
import { selectUserRefreshing } from 'redux/user/selectors';
import { signupValidation } from 'utils/validation';
import { ReactComponent as SigninIcon } from 'assets/signin.svg';
import { Link } from 'react-router-dom';
import routes from 'constants/routes';

const initialValues = { name: '', email: '', password: '' };

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectUserRefreshing);
  const { handleSubmit, errors, values, touched, handleChange, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: signupValidation,
      onSubmit: async values => {
        dispatch(userSingUp(values));
      },
    });

  const fields = [
    { label: 'Name', placeholder: 'John Smith', name: 'name' },
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
        Sign Up
      </Typography>
      <Typography>Type your name, email and password</Typography>
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
            helperText={touched[field.name] && errors[field.name]}
          />
        ))}
        <Button type="submit" variant="contained">
          Sign Up
        </Button>

        <Typography>
          Already have an account?{' '}
          <Link to={routes.LOGIN} replace style={{ color: '#1976d2' }}>
            Log In
          </Link>
        </Typography>
      </form>
    </BackgroundContainer>
  );
};

export default SignUpPage;
