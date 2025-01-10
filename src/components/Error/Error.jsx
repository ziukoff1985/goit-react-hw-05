import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const Error = () => {
  const hasToastShown = useRef(false);
  useEffect(() => {
    if (!hasToastShown.current) {
      toast.error('Something went wrong 🤦‍♂️, try again...');
      hasToastShown.current = true; // Встановлюємо прапорець
    }
  }, []);

  return null;
};

export default Error;
