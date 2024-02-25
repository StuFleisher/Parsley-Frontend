import React from 'react';
import { FieldProps } from 'formik';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField/TextField';

interface FormikMuiTextFieldProps extends FieldProps, Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur'> {}

function getNested(obj: any, path: string): any {
  const keys = path.split(/[\.\[\]\'\"]/).filter(p => p);
  return keys.reduce((accumulator: any, currentKey: string) => {
    // Using type assertion to indicate that accumulator is indexable
    if (accumulator && typeof accumulator === 'object' && currentKey in accumulator) {
      return accumulator[currentKey];
    } else {
      // Return undefined or throw an error if the path does not exist
      return undefined;
    }
  }, obj);
}

const FormikMuiTextField: React.FC<FormikMuiTextFieldProps> = ({ field, form, ...props }) => {
  const { name } = field;
  const { touched, errors } = form;
  const fieldError = getNested(touched, name) && getNested(errors,name) ? "Error" : '';

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