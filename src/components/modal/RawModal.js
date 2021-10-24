import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const RawModal = ({ children, status, title, cancelButtonFunc, maxWidth }) => {
  return (
    <div>
      <Dialog fullWidth maxWidth={maxWidth ?? 'xl'} open={status} onClose={cancelButtonFunc} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={cancelButtonFunc} color="primary">
            {'بستن'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default RawModal;
