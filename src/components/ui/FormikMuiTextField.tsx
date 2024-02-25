import React from 'react';
import { FieldProps } from 'formik';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField/TextField';

interface FormikMuiTextFieldProps extends FieldProps, Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur'> {}

const FormikMuiTextField: React.FC<FormikMuiTextFieldProps> = ({ field, form, ...props }) => {
  const { name } = field;
  const { touched, errors } = form;
  const fieldError = touched[name] && errors[name] ? errors[name] as string : '';

  return (
    <TextField
      {...field}
      {...props}
      error={Boolean(fieldError)}
      helperText={fieldError}
    />
  );
};

export default FormikMuiTextField