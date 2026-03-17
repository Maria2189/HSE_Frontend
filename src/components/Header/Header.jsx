import { NavLink } from 'react-router'
import { useSelector } from 'react-redux'
import { AppBar, Toolbar, Button, Badge, Typography, Box } from '@mui/material'

import MovieIcon from '@mui/icons-material/Movie'
import ArticleIcon from '@mui/icons-material/Article'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteIcon from '@mui/icons-material/Favorite'

const navLinkStyle = ({ isActive }) => ({
  color: isActive ? '#c4894a' : '#9eb6c4',
  borderBottom: isActive ? '1px solid #c4894a' : '1px solid transparent',
  borderRadius: '4px',
  transition: 'color 0.2s, border-color 0.2s',
})

const Header = () => {
  const userName = useSelector((state) => state.user.name)
  const favoritesCount = useSelector((state) => state.favorites.length)

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 }, minHeight: '64px' }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 700,
            letterSpacing: '0.12em',
            fontSize: '1rem',
            color: '#e8d4b8',
            mr: 4,
            flexShrink: 0,
          }}
        >
          CINE<span style={{ color: '#c4894a' }}>SEARCH</span>
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5, flexGrow: 1 }}>
          <Button component={NavLink} to="/" style={navLinkStyle} startIcon={<MovieIcon sx={{ fontSize: 16 }} />}>
            Фильмы
          </Button>
          <Button component={NavLink} to="/posts" style={navLinkStyle} startIcon={<ArticleIcon sx={{ fontSize: 16 }} />}>
            Редакция
          </Button>
          <Button component={NavLink} to="/profile" style={navLinkStyle} startIcon={<PersonIcon sx={{ fontSize: 16 }} />}>
            Профиль
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
          <Button
            component={NavLink}
            to="/favorites"
            style={navLinkStyle}
            startIcon={
              <Badge badgeContent={favoritesCount > 0 ? favoritesCount : null} color="secondary">
                <FavoriteIcon sx={{ fontSize: 16 }} />
              </Badge>
            }
          >
            Избранное
          </Button>
          <Typography
            variant="caption"
            sx={{
              color: '#4a6a7c',
              fontFamily: "'Raleway', sans-serif",
              letterSpacing: '0.05em',
              pl: 2,
              borderLeft: '1px solid #1e3a50',
            }}
          >
            {userName ? (
              <>
                <span style={{ color: '#9eb6c4' }}>Привет, </span>
                <strong style={{ color: '#c4894a' }}>{userName}</strong>
              </>
            ) : (
              <span style={{ color: '#4a6a7c', fontStyle: 'italic' }}>Гость</span>
            )}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
