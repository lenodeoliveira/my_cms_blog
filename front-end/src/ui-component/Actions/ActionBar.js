import React from "react";
import { makeStyles } from '@material-ui/styles';

import {
    Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: 'red',
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    }
}));

function ActionBar({ onSave, onCancel, formik }) {
    const classes = useStyles();

    return (
        <div className="align-right">
            <button onClick={onCancel} type="button"  className={classes.loginInput}>
                CANCELAR
            </button>
            <Button onClick={onSave} disabled={formik ? formik.isSubmitting : false} type="button" className="ml-3 btn btn-bordered btn-elevate">
               SALVAR
            </Button>
        </div>
    )
}

export default ActionBar