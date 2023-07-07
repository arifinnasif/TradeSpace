import React from 'react'
import TextField from '@mui/material/TextField';

const Textfield = (props) => {
  return (
    <TextField
            margin={props.margin}
            required={props.required}
            fullWidth={props.fullWidth}
            id={props.id}
            label={props.label}
            name={props.name}
            autoComplete={props.autoComplete}
            autoFocus={props.autoFocus}
    />
  )
}

Textfield.defaultProps = {
    margin: "normal",
    required: false,
    fullWidth: true,
    autoFocus: false,
}

export default Textfield
