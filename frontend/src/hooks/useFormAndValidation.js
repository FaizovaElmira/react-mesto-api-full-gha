
import {useState, useCallback} from 'react';

export function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(true);

  const handleChange = (event) => {
    const {name, value} = event.target
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: event.target.validationMessage});
    setIsValid(event.target.closest('form').checkValidity());
  };



  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}

export default useFormAndValidation

