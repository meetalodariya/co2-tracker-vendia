import React, { ChangeEventHandler } from 'react';

import TextField from '@mui/material/TextField';
import MuiAutoComplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material/Autocomplete';

export interface AutocompleteProps<T> {
  id: string;
  onInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  options: Array<T>;
  isLoading: boolean;
  label: string;
  onSelect: (
    event: React.SyntheticEvent,
    value: NonNullable<T>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>,
  ) => void;
  error?: boolean;
}

const AutoComplete = <T,>({
  id,
  onInputChange,
  options,
  isLoading,
  label,
  onSelect,
  error,
}: AutocompleteProps<T>): JSX.Element => {
  return (
    <>
      <MuiAutoComplete
        onChange={onSelect}
        id={id}
        sx={{ width: '300px' }}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            onChange={onInputChange}
            error={error}
          />
        )}
        loading={isLoading}
      />
    </>
  );
};

export default AutoComplete;
