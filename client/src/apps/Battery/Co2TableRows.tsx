import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

function Co2TableRows({ rowsData, deleteTableRows, handleCo2Change }) {
  return (
    rowsData &&
    rowsData.map((data, index) => {
      const { year, value } = data;
      return (
        <tr key={index}>
          <td>
            <TextField
              type='text'
              value={year}
              onChange={(evnt) => handleCo2Change(index, evnt)}
              name='year'
              className='form-control'
              id='outlined-basic'
              label='Year'
              variant='outlined'
              data-testid={`co2-year-input-${index}`}
            />
          </td>
          <td>
            <TextField
              type='text'
              value={value}
              onChange={(evnt) => handleCo2Change(index, evnt)}
              name='value'
              className='form-control'
              id='outlined-basic'
              label='Value'
              variant='outlined'
              data-testid={`co2-value-input-${index}`}
            />
          </td>
          <td>
            <IconButton
              onClick={() => deleteTableRows(index)}
              data-testid={`delete-co2-button-${index}`}
            >
              <DeleteIcon />
            </IconButton>
          </td>
        </tr>
      );
    })
  );
}

export default Co2TableRows;
