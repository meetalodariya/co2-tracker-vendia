import React, { ChangeEventHandler } from 'react';

import MuiTextField from '@mui/material/TextField';

export interface TextFieldProps<T> {
  id: string;
  label: string;
  onInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  variant: 'filled' | 'standard' | 'outlined';
  value?: string | number;
  type?: string;
  step?: number;
  min?: number;
  error?: boolean;
  multiline?: boolean;
  rows?: number;
  height?: string | number;
  width?: string | number;
}

const TextField = <T,>({
  id,
  label,
  onInputChange,
  variant: varient,
  type,
  step,
  min,
  value,
  error,
  multiline,
  rows,
  height,
  width,
}: TextFieldProps<T>) => {
  return (
    <>
      <MuiTextField
        style={{ height, width }}
        id={id}
        value={value}
        label={label}
        variant={varient}
        onChange={onInputChange}
        type={type}
        inputProps={{ step, min }}
        error={error}
        multiline={multiline}
        rows={multiline ? rows : null}
      />
    </>
  );
};

export default TextField;
