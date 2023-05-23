
import React from 'react';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';

export function ConfirmDialog({ message, open, confirm, onClose, intl }) {

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogContent style={{display: 'flex', justifyContent: 'center'}}>
               {message}
            </DialogContent>
            <DialogActions style={{ padding: '8px 24px'}} >
                <button type="button" onClick={onClose} className="ml-3 btn btn-bordered btn-elevate btn-danger">
                    CANCELAR
                </button>
                <button type="button" onClick={confirm} className="ml-3 btn btn-bordered btn-elevate btn-success">
                    CONFIRMAR
                </button>
            </DialogActions>
        </Dialog>
    );
}