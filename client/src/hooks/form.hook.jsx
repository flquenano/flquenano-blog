import { useState } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  return {
    values,
    handleChange: (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    }
  };
};
