import React, { ChangeEventHandler } from 'react';

import TextareaAutosize from '@mui/material/TextareaAutosize';

export interface TextAreaProps<T> {
  label: string;
  minRows: number;
  placeholder: string;
  width: number;
  onInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: boolean;
}

const TextArea = <T,>({
  label,
  minRows,
  placeholder,
  width,
  onInputChange,
  error,
}: TextAreaProps<T>) => {
  return (
    <>
      <TextareaAutosize
        aria-label={label}
        minRows={minRows}
        placeholder={placeholder}
        style={{ width: width, borderColor: error ? 'red' : '' }}
        onChange={onInputChange}
      />
    </>
  );
};

export default TextArea;
