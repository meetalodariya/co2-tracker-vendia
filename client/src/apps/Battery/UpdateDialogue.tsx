import React, { FC, useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Battery } from './types';
import { useAuth } from '../../providers/auth';
import Co2TableRows from './Co2TableRows';

interface Props {
  open: boolean;
  handleClose: () => void;
  row: Battery;
}

const UpdateDialogue: FC<Props> = ({ open, handleClose, row }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(row);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: Partial<Battery>) =>
      axios.put('http://localhost:8001/battery', data, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAllBatteries');
      },
    },
  );

  const submitUpdateForm = () => {
    mutation.mutate(formData);
    handleClose();
  };

  const handleChange = ({ name, value }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addCo2TableRows = () => {
    if (formData.co2?.length) {
      const lastRow = formData.co2[formData.co2.length - 1];
      if (!(lastRow.value && lastRow.year)) {
        return;
      }

      const rowsInput = {
        value: '',
        year: '',
      };
      const test = [...formData.co2];
      test.push(rowsInput);
      setFormData({
        ...formData,
        ['co2']: test,
      });
    } else {
      setFormData({
        ...formData,
        ['co2']: [
          {
            value: '',
            year: '',
          },
        ],
      });
    }
  };

  const deleteTableRows = (index) => {
    const rows = [...formData.co2];
    rows.splice(index, 1);
    setFormData({
      ...formData,
      ['co2']: rows,
    });
  };

  const handleCo2Change = (index, event) => {
    const { name, value } = event.target;
    const rowsInput = [...formData.co2];
    rowsInput[index][name] = value;
    setFormData({
      ...formData,
      ['co2']: rowsInput,
    });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Update battery details: {row.serialNumber}</DialogTitle>
        <DialogContent>
          <TextField
            data-testid={'update-battery-partNumber-field'}
            autoFocus
            margin='dense'
            label='Part number'
            name='partNumber'
            type='text'
            fullWidth
            variant='standard'
            value={formData.partNumber}
            onChange={(e) =>
              handleChange({ name: e.target.name, value: e.target.value })
            }
            style={{ margin: '10px' }}
          />
          <TextField
            data-testid={'update-battery-imageURL-field'}
            margin='dense'
            label='Image URL'
            name='imageURL'
            type='text'
            fullWidth
            variant='standard'
            value={formData.imageURL}
            onChange={(e) =>
              handleChange({ name: e.target.name, value: e.target.value })
            }
            style={{ margin: '10px' }}
          />
          <TextField
            data-testid={'update-battery-salesPrice-field'}
            margin='dense'
            label='Sales price'
            name='salesPrice'
            type='number'
            fullWidth
            variant='standard'
            value={formData.salesPrice}
            onChange={(e) =>
              handleChange({ name: e.target.name, value: +e.target.value })
            }
            style={{ margin: '10px', marginBottom: '14px' }}
          />
          <div style={{ margin: '10px' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label='Date of Manufacture'
                inputFormat='MM/dd/yyyy'
                value={formData.dateManufactured}
                onChange={(value: Date | null) => {
                  if (value) {
                    handleChange({
                      name: 'dateManufactured',
                      value: new Date(value).toISOString().split('T')[0],
                    });
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <table
            className='table'
            style={{ borderSpacing: '8px', borderCollapse: 'separate' }}
          >
            <thead>
              <tr>
                <th>Year</th>
                <th>CO2 Value</th>
              </tr>
            </thead>
            <tbody>
              <Co2TableRows
                rowsData={formData.co2}
                deleteTableRows={(i) => deleteTableRows(i)}
                handleCo2Change={(i, e) => handleCo2Change(i, e)}
              />
            </tbody>
            <IconButton
              onClick={addCo2TableRows}
              data-testid={'add-battery-button'}
            >
              <AddIcon />
            </IconButton>
          </table>
        </DialogContent>
        <DialogActions>
          <Button color='warning' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color='success'
            data-testid={'update-battery-submit-button'}
            onClick={submitUpdateForm}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateDialogue;
