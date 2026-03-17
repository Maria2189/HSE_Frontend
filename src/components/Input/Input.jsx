import { TextField } from '@mui/material'

function Input({ value, onChange, placeholder, type = 'text' }) {
  return (
    <TextField
      variant="outlined"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      size="small"
      fullWidth
    />
  )
}

export default Input
