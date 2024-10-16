import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { logoutUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export const Logout: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const mutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            localStorage.removeItem("access_token");
            toast.success('Logged out successfully!');
            navigate('/auth/sign-in');
        },
        onError: () => {
            toast.error('Logout failed!');
        },
    });

    const toggleDialog = (shouldOpen: boolean) => setOpen(shouldOpen);

    const handleConfirmLogout = () => {
        mutation.mutate();
        toggleDialog(false);
    };

    return (
        <>
            <Button variant="contained" color="secondary" onClick={() => toggleDialog(true)}>
                Logout
            </Button>

            <Dialog open={open} onClose={() => toggleDialog(false)}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    Are you sure you want to log out?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => toggleDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmLogout} color="secondary">
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};