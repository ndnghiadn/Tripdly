import { useState } from 'react';

export const useOptimistic = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [pending, setPending] = useState(false);

  const updateValueOptimistically = async (asyncFn, ...args) => {
    // Optimistically update the UI
    setValue(value);
    setPending(true);

    try {
      // Invoke the async function
      await asyncFn(...args);

      // Once the operation succeeds, set pending to false
      setPending(false);
    } catch (error) {
      // If an error occurs during the operation, handle it here
      console.error('Error:', error);
      // Optionally revert the value to its previous state or display an error message
      setValue(initialValue);
      setPending(false);
    }
  };

  return { value, pending, updateValueOptimistically };
};

