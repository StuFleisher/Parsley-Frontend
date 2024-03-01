import React from 'react';
import { FieldProps } from 'formik';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { getNested } from '../../helpers/utilities';

interface FormikMuiTextFieldProps extends FieldProps, Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur'> {}

const FormikMuiTextField: React.FC<FormikMuiTextFieldProps> = ({ field, form, ...props }) => {
  const { name } = field;
  const { touched, errors } = form;
  const fieldError = getNested(touched, name) && getNested(errors,name) ? "Error" : '';

  return (
    <TextField
      {...field}
      {...props}
      error={Boolean(fieldError)}
      helperText={getNested(errors,name)}
    />
  );
};

export default FormikMuiTextField