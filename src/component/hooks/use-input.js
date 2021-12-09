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
  const setInput = (value)=>{
    setEnteredValue(value);
    setIsTouched(false);
  }

  return {
    value: entredvalue,
    hasError,
    isValid: isValueValid,
    valueChangedHandler,
    inputBlurHandler,
    resetInput,
    setInput,
  }
};

export default useInput;