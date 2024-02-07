import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Subjects } from './Subjects';

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={Subjects}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Subject" />}
    />
  );
}