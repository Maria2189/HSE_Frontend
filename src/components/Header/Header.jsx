import { NavLink } from 'react-router'
import { useSelector } from 'react-redux'
import { AppBar, Toolbar, Button, Badge, Typography, Box } from '@mui/material'

import MovieIcon from '@mui/icons-material/Movie'
import GroupIcon from '@mui/icons-material/Group'
import ArticleIcon from '@mui/icons-material/Article'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Header = () => {
  const userName = useSelector((state) => state.user.name)
  const favoritesCount = useSelector((state) => state.favorites.length)

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={NavLink} to="/" startIcon={<MovieIcon />}>
            Фильмы
          </Button>
          <Button color="inherit" component={NavLink} to="/users" startIcon={<GroupIcon />}>
            Пользователи
          </Button>
          <Button color="inherit" component={NavLink} to="/posts" startIcon={<ArticleIcon />}>
            Посты
          </Button>
          <Button color="inherit" component={NavLink} to="/profile" startIcon={<PersonIcon />}>
            Профиль
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Button
            color="inherit"
            component={NavLink}
            to="/favorites"
            startIcon={
              <Badge badgeContent={favoritesCount > 0 ? favoritesCount : null} color="error">
                <FavoriteIcon />
              </Badge>
            }
          >
            Избранное
          </Button>
          <Typography variant="body1">
            Привет, {userName ? <strong>{userName}</strong> : 'Гость'}!
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
