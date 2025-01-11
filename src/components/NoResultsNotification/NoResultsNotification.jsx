import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const NoResultsNotification = ({ message }) => {
  const hasToastShown = useRef(false);

  useEffect(() => {
    if (!hasToastShown.current) {
      toast.error(
        message || 'No results found. Please try a different query. 🤷‍♂️'
      );
      hasToastShown.current = true;
    }
  }, [message]);

  return null;
};

export default NoResultsNotification;
