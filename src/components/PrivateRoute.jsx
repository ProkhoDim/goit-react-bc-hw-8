import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'redux/redux-hooks';
import { selectUserLoggedIn } from 'redux/user/selectors';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useAppSelector(selectUserLoggedIn);

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
