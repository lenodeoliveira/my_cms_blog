import * as React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function DialogComponent({ handleClose, title, children }, openDialog) {

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
