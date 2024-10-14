import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { logoutUser } from '../api/auth';

export const Logout: React.FC = () => {
    const navigate = useNavigate();
    
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

    const handleLogout = () => {
        mutation.mutate();
    };

    return (
        <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
        </Button>
    );
};