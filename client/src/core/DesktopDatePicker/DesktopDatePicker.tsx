import React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export interface DateTimeProps<T> {
  value: Date | null;
  label: string;
  handleChange: (value: NonNullable<T>, keyboardInputValue?: string) => void;
  error?: boolean;
  shouldDisableDate?: (day: NonNullable<T>) => boolean;
}

const DateTime = <T,>({
  value,
  handleChange,
  label,
  error,
  shouldDisableDate,
}: DateTimeProps<T>): JSX.Element => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          InputProps={{ error }}
          label={label}
          inputFormat='MM/dd/yyyy'
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          shouldDisableDate={shouldDisableDate}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateTime;
