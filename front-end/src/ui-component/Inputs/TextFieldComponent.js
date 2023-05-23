import React from 'react'
import { InputLabel, TextField } from '@material-ui/core';
import { ErrorMessage } from '../error-message/ErrorMessage';

export default function TextFieldComponent(props) {
    let { formik, field, label, multiline, rows, inputProps } = props
    let mutationMethods = formik && field ? formik.getFieldProps(field) : {}

    return <>
        <InputLabel htmlFor={`id-${label}`} > {label} </InputLabel>
        <TextField
            id={`id-${label}`}
            fullWidth
            pattern='\d*'
            margin="normal"
            InputProps={inputProps}
            {...mutationMethods}
            multiline
            size="small"
            disabled={props.disabled || false}
        />
    </>
}