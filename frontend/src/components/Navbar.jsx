import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    Button,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const pages = [{ name: "Home", path: "/" }];

function Navbar({ darkMode, toggleDarkMode }) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: darkMode ? "#3e352e" : "#ac8969",
                color: darkMode ? "#ba8d56" : "#e7decf",
            }}
        >
            <Toolbar>
                {/* Mobile Menu Button */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                    sx={{ display: { xs: "flex", md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Logo and Home Link */}
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            textDecoration: "none",
                            color: darkMode ? "#907a61" : "#e7decf",
                            mr: 2,
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                        <Typography
                            component={Link}
                            to={pages[0].path}
                            sx={{
                                color: darkMode ? "#907a61" : "#e7decf",
                                textDecoration: "none",
                            }}
                        >
                            {pages[0].name}
                        </Typography>
                    </Box>
                </Box>

                {/* Create Button */}
                <Button
                    component={Link}
                    to="/create"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textTransform: "none",
                        color: darkMode ? "#907a61" : "#e7decf",
                        minWidth: "64px",
                    }}
                >
                    <AddBoxIcon sx={{ fontSize: 30 }} />
                    <Typography variant="caption">Create</Typography>
                </Button>

                {/* Dark Mode Toggle */}
                <IconButton onClick={toggleDarkMode} sx={{ color: darkMode ? "#907a61" : "#e7decf" }}>
                    {darkMode ? <Brightness7Icon sx={{ fontSize: 30 }} /> : <Brightness4Icon sx={{ fontSize: 30 }} />}
                </IconButton>
            </Toolbar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="top"
                open={drawerOpen}
                PaperProps={{
                    sx: {
                        backgroundColor: darkMode ? "#3e352e" : "#ac8969",
                        color: darkMode ? "#ba8d56" : "#e7decf",
                        height: "50vh", // Taller height for the drawer
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                    },
                }}
            >
                {/* Close Button */}
                <IconButton
                    onClick={toggleDrawer(false)}
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        color: darkMode ? "#907a61" : "#3e352e",
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {/* Centered Home Button */}
                <Button
                    component={Link}
                    to={pages[0].path}
                    onClick={toggleDrawer(false)}
                    sx={{
                        color: darkMode ? "#3e352e" : "#e7decf", // Adjusted text color based on mode
                        textDecoration: "none",
                        fontSize: "1.5rem",
                        backgroundColor: "#a17d52", // Background color for Home button in drawer
                        textTransform: "none", // Keep text styling
                        padding: "10px 20px",
                        borderRadius: "8px",
                    }}
                >
                    {pages[0].name}
                </Button>
            </Drawer>
        </AppBar>
    );
}

export default Navbar;