import * as Yup from 'yup';

const emailRegExp =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const nameRegExp = /^[a-z ,.'-]+$/i;

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .required()
    .label('Email')
    .matches(emailRegExp, 'Email is not valid!'),
  password: Yup.string()
    .required()
    .label('Password')
    .min(7, 'Password must have at least 7 characters'),
});

export const signupValidation = loginValidation.shape({
  name: Yup.string()
    .required()
    .label('Name')
    .matches(
      nameRegExp,
      'Name field allows only letters, spaces, dashes and commas'
    ),
});

export const contactValidation = Yup.object().shape({
  name: Yup.string()
    .required()
    .label('Name')
    .matches(
      nameRegExp,
      'Name field allows only letters, spaces, dashes and commas'
    ),
  number: Yup.string()
    .required()
    .label('Phone number')
    .matches(
      /(^[+]\d*$)|(^\d*$)/,
      'Phone number must contain only number and optional plus at the begining'
    )
    .min(10, 'Phone number must have at least 10 number')
    .max(13, 'Phone number is too long'),
});
