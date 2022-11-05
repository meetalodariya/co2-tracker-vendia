import React, { FC, useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Motor } from './types';
import { useAuth } from '../../providers/auth';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AddDialogue: FC<Props> = ({ open, handleClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    serialNumber: '',
    partNumber: '',
    imageURL: '',
    dateManufactured: new Date().toLocaleDateString(),
    salesPrice: '',
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: Partial<Motor>) =>
      axios.post('http://localhost:8001/motor', data, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAllMotors');
      },
    },
  );

  const submitUpdateForm = () => {
    mutation.mutate(formData);
    handleClose();
    setFormData({
      serialNumber: '',
      partNumber: '',
      imageURL: '',
      dateManufactured: new Date().toISOString().split('T')[0],
      salesPrice: '',
    });
  };

  const handleChange = ({ name, value }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add Motor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Serial number'
            name='serialNumber'
            type='text'
            fullWidth
            variant='standard'
            value={formData.serialNumber}
            onChange={(e) =>
              handleChange({ name: e.target.name, value: e.target.value })
            }
            style={{ margin: '10px' }}
          />
          <TextField
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
        </DialogContent>
        <DialogActions>
          <Button color='warning' onClick={handleClose}>
            Cancel
          </Button>
          <Button color='success' onClick={submitUpdateForm}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDialogue;
