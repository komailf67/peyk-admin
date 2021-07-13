import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const FormModal = ({ status, title, description, placeholder, inputType, okButtonText, cancelButtonText, acceptButtonFunc, cancelButtonFunc }) => {
  const [text, setText] = React.useState('');

  return (
    <div>
      <Dialog open={status} onClose={cancelButtonFunc} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {description ? <DialogContentText>{description}</DialogContentText> : null}
          <TextField value={text} onChange={(e) => setText(e.target.value)} autoFocus margin="dense" id="name" label={placeholder} type={inputType} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => acceptButtonFunc(text)} color="primary">
            {cancelButtonText ?? 'تایید'}
          </Button>
          <Button onClick={cancelButtonFunc} color="primary">
            {okButtonText ?? 'لغو'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default FormModal;
