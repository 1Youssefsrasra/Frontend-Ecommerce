	import "./Navbar.css";
	import { Link } from "react-router-dom";
	import {useLogout} from "../hooks/useLogout";
	import {useAuthContext} from "../hooks/useAuthContext";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


function ResponsiveAppBar() {

	const {logout} = useLogout()
	const {user} = useAuthContext()

	const handleClick = () =>{
		logout()
	}



  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">MEN</Typography>
                </MenuItem>
				<MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">WOMEN</Typography>
                </MenuItem>
				<MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">KIDS</Typography>
                </MenuItem>
			  {user && (<div> 
						<span>{user.email}</span>

						<span>{user.role}</span>

            			<button onClick={handleClick}>Log out</button>
					
         			 </div>)}
					  
            </Menu>
          </Box>

		  
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
				<a href="/">MEN</a>
              </Button>
			  <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
				<a href="/">WOMEN</a>
              </Button>
			  <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
				<a href="/">KIDS</a>
              </Button>
			  {user && (<div> 
						<span>{user.email}</span>
						<span>{user.role}</span>
					
         			 </div>)}
          </Box>

          <Box sx={{ flexGrow: 0 }}>

          {!user && (<div>	
				<Link to="/Signup"> 
				<button className="sign-btn">Sign Up</button>
				</Link>
				<Link to="/Login"> 
				<button className="sign-btn">Log In</button>
				</Link>
				</div>)}

		  {user && (<Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>)}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><button onClick={handleClick}>Log out</button></Typography>
                </MenuItem>
				{user && user.role==='admin'  && (<MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><Link to='/AdminHome'>Dashboard</Link></Typography>
                </MenuItem>)}
                {user && user.role==='client'  && (<MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><Link to="/Cart">My Cart</Link></Typography>
                </MenuItem>)}
				<MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">My Account</Typography>
                </MenuItem>
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;