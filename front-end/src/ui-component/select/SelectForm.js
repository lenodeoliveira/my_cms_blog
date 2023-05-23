import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import React from "react";
import { get } from "lodash"

export function SelectForm({ label, options, validation, field, description, disabled, id, onChange, valueField, value }) {
    
    
    return (
        <div className='w-100'>
            <InputLabel key={"input" + id} disabled={disabled} shrink={true} htmlFor={label} style={{ fontWeight: 'bold'}}>{label}</InputLabel>
            <Select
                fullWidth
                disabled={disabled}
                value= {value}
                defaultValue= {value}
                {...validation.getFieldProps(field)}
                style={{ backgroundColor: "#f3f3f3", borderRadius: 3 }}
                key={label}
                {...onChange ? { onChange: onChange } : {}}
            >
                <MenuItem id={"menu" + id} value='' disabled />
                {options.map(opt => (
                    <MenuItem id={id + valueField ? opt[valueField] : opt.id} value={valueField ? opt[valueField] : opt.id} key={valueField ? opt[valueField] : opt.id}>{get(opt, description, opt.name)}</MenuItem>
                ))}
            </Select>
        </div >
    )
}