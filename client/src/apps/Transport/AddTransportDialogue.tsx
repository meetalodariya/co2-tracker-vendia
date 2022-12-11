import React, { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddTransportForm from './AddTransportForm';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AddTransportDialogue: FC<Props> = ({ open, handleClose }) => {
  return (
    <>
      <Dialog open={open} fullWidth data-testid='add-transport-dialog'>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Add Transport Method
          <IconButton
            id='customized-dialog-title'
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
            data-testid='add-transport-dialog-close'
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <AddTransportForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTransportDialogue;
