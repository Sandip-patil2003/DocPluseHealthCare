import React, { useState } from "react";
import { AppBar, Toolbar, Link as MuiLink, Button, Menu, MenuItem, IconButton, Box, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logoUrl from "/docpulse-logo.svg";

const navDropdowns = [
  {
    label: "Doctors",
    links: [
      { label: "Deactivated Doctors", to: "/doctors/deactivated" },
      { label: "New Doctor", to: "/doctors/add" },
      { label: "Our Doctors", to: "/doctors" },
    ],
  },
  {
    label: "Appointments",
    links: [
      { label: "See your Appointments", to: "/appointments" },
      { label: "Book Appointment", to: "/appointments/book" },
    ],
  },
  {
    label: "Prescriptions",
    links: [
      { label: "All Prescriptions", to: "/prescriptions" },
      { label: "Add Prescription", to: "/prescriptions/add" },
    ],
  },
  {
    label: "Patients",
    links: [   
      { label: "Patients List", to: "/patients" },
      { label: "Ragister", to: "/patients/add" },
    ],
  },
];

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuEl, setUserMenuEl] = useState(null);
  const location = useLocation();

  const handleMenuOpen = (event, label) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(label);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const openUserMenu = (e) => setUserMenuEl(e.currentTarget);
  const closeUserMenu = () => setUserMenuEl(null);

  const Brand = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <MuiLink component={NavLink} to="/" underline="none" sx={{ display: 'inline-flex' }}>
        <img src={logoUrl} alt="DocPulse" style={{ height: 28, display: 'block' }} />
      </MuiLink>
    </Box>
  );

  const TopLinks = (
    <>
      <MuiLink
        component={NavLink}
        to="/"
        color="inherit"
        underline="none"
        sx={{ fontWeight: 600, mx: 1, '&:hover': { color: '#fff', textDecoration: 'underline' }, '&.active': { color: '#ffd600', fontWeight: 700 } }}
      >
        Home
      </MuiLink>
      <MuiLink
        component={NavLink}
        to="/services"
        color="inherit"
        underline="none"
        sx={{ mx: 1, '&:hover': { color: '#fff', textDecoration: 'underline' }, '&.active': { color: '#ffd600', fontWeight: 700 } }}
      >
        Our Services
      </MuiLink>
      <MuiLink
        component={NavLink}
        to="/about"
        color="inherit"
        underline="none"
        sx={{ mx: 1, '&:hover': { color: '#fff', textDecoration: 'underline' }, '&.active': { color: '#ffd600', fontWeight: 700 } }}
      >
        About
      </MuiLink>
      {navDropdowns.map((item) => (
        <span key={item.label}
          onMouseEnter={(e) => handleMenuOpen(e, item.label)}
          onMouseLeave={handleMenuClose}
        >
          <Button
            color="inherit"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              mx: 1,
              '&:hover': { color: '#fff', background: 'rgba(25,118,210,0.08)' },
              '&.active': { color: '#ffd600', fontWeight: 700 },
            }}
            aria-haspopup="true"
            aria-controls={`menu-${item.label}`}
            className={location.pathname.startsWith(item.links[0].to) ? 'active' : ''}
          >
            {item.label}
          </Button>
          <Menu
            id={`menu-${item.label}`}
            anchorEl={openMenu === item.label ? anchorEl : null}
            open={openMenu === item.label}
            onClose={handleMenuClose}
            MenuListProps={{
              onMouseEnter: () => setOpenMenu(item.label),
              onMouseLeave: handleMenuClose,
              sx: { background: '#1976d2', color: '#fff' },
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            {item.links.map((link) => (
              <MenuItem
                key={link.to}
                component={NavLink}
                to={link.to}
                onClick={handleMenuClose}
                sx={{ '&:hover': { background: '#1565c0', color: '#ffd600' }, '&.active': { background: '#1565c0', color: '#ffd600', fontWeight: 700 } }}
                className={location.pathname === link.to ? 'active' : ''}
              >
                {link.label}
              </MenuItem>
            ))}
          </Menu>
        </span>
      ))}
      <MuiLink
        component={NavLink}
        to="/contact"
        color="inherit"
        underline="none"
        sx={{ mx: 1, '&:hover': { color: '#fff', textDecoration: 'underline' }, '&.active': { color: '#ffd600', fontWeight: 700 } }}
      >
        Contact
      </MuiLink>
    </>
  );

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {Brand}
        </Box>

        <IconButton color="inherit" edge="start" sx={{ display: { xs: 'inline-flex', md: 'none' } }} onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flexGrow: 1 }}>
          {TopLinks}
        </Box>

        {isAuthenticated && (
          <>
            <IconButton color="inherit" onClick={openUserMenu} sx={{ ml: 'auto' }}>
              <Avatar sx={{ width: 32, height: 32 }}>{(user?.username || 'U').slice(0,1).toUpperCase()}</Avatar>
            </IconButton>
            <Menu anchorEl={userMenuEl} open={Boolean(userMenuEl)} onClose={closeUserMenu} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <MenuItem disabled>{user?.email || 'Logged in'}</MenuItem>
              <Divider />
              <MenuItem onClick={() => { closeUserMenu(); logout(); }}>
                <LogoutIcon fontSize="small" style={{ marginRight: 8 }} /> Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 280 }} role="presentation" onClick={toggleDrawer(false)}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2 }}>
            <img src="/docpulse-logo.svg" alt="DocPulse" style={{ height: 28, display: 'block' }} />
          </Box>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/">
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/services">
                <ListItemText primary="Our Services" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/about">
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>
            {navDropdowns.map((group) => (
              <Box key={group.label} sx={{ mt: 1 }}>
                <Typography variant="overline" sx={{ pl: 2, color: 'text.secondary' }}>{group.label}</Typography>
                {group.links.map((l) => (
                  <ListItem key={l.to} disablePadding>
                    <ListItemButton component={NavLink} to={l.to}>
                      <ListItemText primary={l.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </Box>
            ))}
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/contact">
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
            {isAuthenticated && (
              <ListItem disablePadding>
                <ListItemButton onClick={logout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
