import React from 'react';
import { Logout } from './Logout';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

export const Navbar: React.FC = () => {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Company Dashboard
                </Typography>
                <Box>
                    <Logout/>
                </Box>
            </Toolbar>
        </AppBar>
    );
};