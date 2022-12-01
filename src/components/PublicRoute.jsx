import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'redux/redux-hooks';
import { selectUserLoggedIn } from 'redux/user/selectors';

const PublicRoute = ({ component: Component, redirectTo = '/' }) => {
    const isLoggedIn = useAppSelector(selectUserLoggedIn);
    return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
}

export default PublicRoute