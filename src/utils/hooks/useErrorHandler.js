import { useEffect } from 'react';
import { useAppSelector } from 'redux/redux-hooks';

export default function useErrorHandler(
  selector = () => {},
  onError = () => {}
) {
  const error = useAppSelector(selector);

  useEffect(() => {
    if (error) {
      onError(error);
    }
  }, [error, onError]);
}
