import { useState } from 'react';

const useInput = (validate) => {
  const [entredvalue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValueValid = validate(entredvalue);
  const hasError = isTouched && !isValueValid;

  const valueChangedHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const resetInput = () => {
    console.log('reset Input');
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: entredvalue,
    hasError,
    isValid: isValueValid,
    valueChangedHandler,
    inputBlurHandler,
    resetInput
  }
};

export default useInput;