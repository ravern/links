import { useCallback, useState } from "react";

function useForm({ values: initialValues, onSubmit, onSuccess }) {
  const [values, setValues] = useState(initialValues ?? {});

  const [error, setError] = useState(null);

  const setValue = useCallback(
    (name, value) => {
      setValues((values) => ({
        ...values,
        [name]: value,
      }));
    },
    [setValues]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const data = await onSubmit(values);
        setValues(initialValues);
        setError(null);
        onSuccess(data);
      } catch (error) {
        setError(error);
      }
    },

    [values, onSubmit, setError]
  );

  const reset = useCallback(() => setValues(initialValues), [
    setValues,
    initialValues,
  ]);

  const onChange = useCallback(
    (name) => (eOrValue) => {
      if (eOrValue === undefined) {
        return;
      } else if (eOrValue?.target) {
        setValue(name, eOrValue.target.value);
      } else {
        setValue(name, eOrValue);
      }
    },
    [setValue]
  );

  return {
    error,
    setError,
    values,
    onSubmit: handleSubmit,
    onChange,
    setValue,
    reset,
  };
}

export default useForm;
