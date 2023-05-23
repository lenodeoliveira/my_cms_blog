import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

export default function ErrorDialog({ error, open, onClose }) {
    
    return (
        <div>
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle style={{color: '#f44336'}} id="alert-dialog-title">
            {"Error"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {error} 
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button style={{color: '#f44336'}} onClick={() => onClose()}>OK</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
