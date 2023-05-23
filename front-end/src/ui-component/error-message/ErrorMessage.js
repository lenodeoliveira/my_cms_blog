import _ from "lodash";
import React from "react";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '0.25rem',
        color: 'red',
        fontSize: '0.9rem',
        fontWeight: '400',
    },
    
}));

export function ErrorMessage({ formik, field, trySubmit }) {
    const classes = useStyles();

    try {
        if (formik.touched[field] || trySubmit) {
            if (typeof formik.errors[field] == 'object') {
                let child = []
                Object.keys(formik.errors[field]).map(key => {
                    if (formik.touched[field][key]) {
                        child.push(<div className={`${classes.container} mb-1`}>
                            <div className="fv-help-block">{_.get(formik, `errors[${field}][${key}]`, '')}</div>
                        </div>)
                    }
                })
                return child
            } else return (
                (formik.errors[field] ? (
                    <div className={`${classes.container} mb-1`}>
                        <div className="fv-help-block">{_.get(formik, `errors[${field}]`, '')}</div>
                    </div>
                ) : null
                ))
        }
        return null
    } catch (ex) {
        return null
    }
}
