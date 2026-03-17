import Card from './Card'
import { Typography } from '@mui/material'

export default {
  title: 'UI-Kit/Card',
  component: Card,
}

export const Default = {
  args: {
    children: <Typography>Пример содержимого карточки из Material-UI</Typography>,
  },
}
