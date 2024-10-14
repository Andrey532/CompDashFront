import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Logout } from './Logout';

export const Navbar: React.FC = () => {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>
                <Box>
                    <Logout/>
                </Box>
            </Toolbar>
        </AppBar>
    );
};