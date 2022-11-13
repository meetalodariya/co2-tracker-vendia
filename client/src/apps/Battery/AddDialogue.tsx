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
import { Battery } from './types';
import { useAuth } from '../../providers/auth';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Co2TableRows from './Co2TableRows';
import IconButton from '@mui/material/IconButton';

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
    co2:[{year:'',value:''}],
    dateManufactured: new Date().toISOString().split('T')[0],
    salesPrice: '',
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: Partial<Battery>) =>
      axios.post('http://localhost:8001/battery', data, {
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
    setFormData({
      serialNumber: '',
      partNumber: '',
      imageURL: '',
      co2:[{year:'',value:''}],
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


  const addCo2TableRows = ()=>{
    const rowsInput={
      value:'',
      year:'',
    } ;
    const test = [...formData.co2];
    test.push(rowsInput);
    setFormData({
      ...formData, 
      ["co2"]: test,
    });
  }



const deleteTableRows = (index)=>{
  debugger;
  const rows = [...formData.co2];
  rows.splice(index, 1);
  setFormData({
    ...formData, 
    ["co2"]: rows,
  });
}



const handleCo2Change = (index,event)=>{
const { name, value } = event.target;
const rowsInput = [...formData.co2];
rowsInput[index][name] = value;
setFormData({
  ...formData, 
  ["co2"]: rowsInput,
});
}


  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        data-testid='add-battery-dialog'
      >
        <DialogTitle>Add Battery</DialogTitle>
        <DialogContent>
          <TextField
            data-testid={'add-battery-serialNumber-field'}
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
            data-testid={'add-battery-partNumber-field'}
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
            data-testid={'add-battery-imageURL-field'}
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
            data-testid={'add-battery-salesPrice-field'}
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    data-testid='add-battery-dateManufactured-field'
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="row">
            <div className="col-sm-8">
                <table className="table">
                    <thead>
                      <tr>
                          <th>Year</th>
                          <th>Value</th>
                          <th>
                            {/* <button className="btn btn-outline-success" onClick={addCo2TableRows} >+</button> */}
                            {/* <IconButton onClick={()=>(deleteTableRows(index))} data-testid={'edit-battery-button'}>
                                <DeleteIcon />
                            </IconButton>
                            <Button variant="outlined" onClick={addCo2TableRows} startIcon={<AddIcon />}>
                                Add
                            </Button> */}
                            </th>
                      </tr>
                    </thead>
                  <tbody>
                  <Co2TableRows rowsData={formData.co2} deleteTableRows={(i)=>deleteTableRows(i)} handleCo2Change={(i,e)=>handleCo2Change(i,e)} />
                  </tbody> 
                  <IconButton onClick={addCo2TableRows} data-testid={'add-battery-button'}>
                      <AddIcon />
                   </IconButton>
                </table>
              </div>
        </div>
        </DialogContent>
        <DialogActions>
          <Button color='warning' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color='success'
            onClick={submitUpdateForm}
            data-testid={'add-battery-submit-button'}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDialogue;
