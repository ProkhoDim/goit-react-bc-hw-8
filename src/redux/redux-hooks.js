import { useDispatch, useSelector } from 'react-redux';

/** @type {import('react-redux').TypedUseSelectorHook<ReduxStore>} */
export const useAppSelector = useSelector;

/** @type {() => import('@reduxjs/toolkit').Dispatch<ReduxDispatch>} */
export const useAppDispatch = () => useDispatch();
