import React, { FC, useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '../../providers/auth';
import { HPTDetails, Component } from '../Dashboard/types';
import { useWorkbench } from 'src/providers/workbench/workbench';
import { getCo2ValueInKgByDistance, getLatestCo2Value } from '@utils/co2';
import { CircularProgress } from '@mui/material';

import animationStyles from './animation.scss';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const CreateHptForm: FC<Props> = ({ open, handleClose }) => {
  const {
    selectedBattery,
    selectedMotor,
    selectedTransport,
    setActiveComponentList,
    resetSelection,
  } = useWorkbench();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    serialNumber: '',
    toolType: '',
    imageURL: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<{
    serialNumber: string;
  } | null>(null);

  const mutation = useMutation(
    (data: HPTDetails) =>
      axios.post('http://localhost:8001/hpt', data, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      }),
    {
      onSuccess: () => {
        setShowSuccess({ serialNumber: formData.serialNumber });
        setActiveComponentList('');
        resetSelection();
      },
    },
  );

  const submitForm = () => {
    setIsLoading(true);
    const components: Component[] = [
      {
        type: 'motor',
        serialNumber: selectedMotor.serialNumber,
        co2: +getLatestCo2Value(selectedMotor.co2).value,
      },
      {
        type: 'battery',
        serialNumber: selectedBattery.serialNumber,
        co2: +getLatestCo2Value(selectedBattery.co2).value,
      },
    ];

    const transport = {
      transportationMethod: selectedTransport.transportationMethod,
      trackingId: selectedTransport.trackingId,
      co2: getCo2ValueInKgByDistance(
        selectedTransport.distance,
        selectedTransport.co2,
      ),
    };

    mutation.mutate({
      components,
      imageURL: formData.imageURL,
      toolType: formData.toolType,
      serialNumber: formData.serialNumber,
      transport,
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
        {showSuccess ? (
          <>
            <div className={animationStyles.wrapper}>
              <svg
                className={animationStyles.checkmark}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 52 52'
              >
                <circle
                  className={animationStyles['checkmark__circle']}
                  cx='26'
                  cy='26'
                  r='25'
                  fill='none'
                />
                <path
                  className={animationStyles['checkmark__check']}
                  fill='none'
                  d='M14.1 27.2l7.1 7.2 16.7-16.8'
                />
              </svg>
              <div style={{ textAlign: 'center' }}>
                Your Hornet Power Tool with Serial Number:{' '}
                <strong>{showSuccess.serialNumber}</strong> has been
                successfully created.
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogTitle>Please provide additional information</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin='dense'
                label='Tool Type'
                name='toolType'
                type='text'
                fullWidth
                variant='standard'
                value={formData.toolType}
                onChange={(e) =>
                  handleChange({ name: e.target.name, value: e.target.value })
                }
                style={{ margin: '10px' }}
                data-testid='create-hpt-toolType-field'
              />
              <TextField
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
                data-testid='create-hpt-serialNumber-field'
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
                data-testid='create-hpt-imageURL-field'
              />
            </DialogContent>
            <DialogActions>
              <Button color='warning' onClick={handleClose}>
                Cancel
              </Button>
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                <Button
                  color='success'
                  onClick={submitForm}
                  disabled={
                    !(
                      formData.serialNumber &&
                      formData.imageURL &&
                      formData.toolType
                    )
                  }
                  data-testid='create-hpt-submit-button'
                >
                  Submit
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default CreateHptForm;
