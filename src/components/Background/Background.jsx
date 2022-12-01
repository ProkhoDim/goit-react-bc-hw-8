import React from 'react';
import css from './Background.module.css';

const Backdrop = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};

export default Backdrop;
