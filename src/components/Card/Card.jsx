import { Card as MuiCard, CardContent } from '@mui/material'

function Card({ children }) {
  return (
    <MuiCard sx={{ minWidth: 275, mb: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>{children}</CardContent>
    </MuiCard>
  )
}

export default Card
