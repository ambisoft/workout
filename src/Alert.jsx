import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Alert = ({ onClose }) => (
  <Dialog
    open={true}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      You're all set!
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Thank you for your interest in <strong>Workout</strong>
        <br/>
        We'll contact you as soon as accept another group of Beta Users.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color='success' onClick={onClose}>
        For Now - Keep Working out!
      </Button>
    </DialogActions>
  </Dialog>
);

export default Alert;
