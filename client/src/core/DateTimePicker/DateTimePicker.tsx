import React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export interface DateTimeProps<T> {
  value: Date | null;
  label: string;
  handleDateTimechange: (
    value: NonNullable<T>,
    keyboardInputValue?: string,
  ) => void;
  error?: boolean;
}

const DateTime = <T,>({
  value,
  handleDateTimechange,
  label,
  error,
}: DateTimeProps<T>): JSX.Element => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          InputProps={{ error }}
          label={label}
          value={value}
          onChange={handleDateTimechange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateTime;
