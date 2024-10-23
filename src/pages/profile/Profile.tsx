import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile, UserType } from '../../api/users';
import { toast, ToastContainer } from 'react-toastify';
import { Avatar, Box, Typography, IconButton } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import { EditProfileModal } from '../../components/EditProfileModal';

export const Profile: React.FC = () => {
    const id = localStorage.getItem("id");
    const storedUserProfile = localStorage.getItem("userProfile");
    const userProfile = storedUserProfile ? JSON.parse(storedUserProfile) : null;

    const { data, isLoading, error } = useQuery<UserType>({
        queryKey: ['userProfile'],
        //@ts-ignore
        queryFn: () => fetchUserProfile(+id),
        enabled: !!userProfile,
    });

    useEffect(() => {
        if (error) {
            toast.error('Failed to load user data');
        }
    }, [error]);

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    if (isLoading) return <div>Loading...</div>;

    return (
        <Box
            sx={{
                width: 350,
                height: 400,
                margin: '0 auto',
                padding: 4,
                textAlign: 'left',
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: 2,
                position: 'relative',
            }}
        >
            <IconButton
                onClick={handleOpenModal}
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                }}
            >
                <Settings />
            </IconButton>

            <Avatar
                src={data?.phone_number || '/default-avatar.png'}
                sx={{ width: 150, height: 150, margin: '0 auto' }}
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
                {data?.first_name} {data?.last_name}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
                Phone: {data?.phone_number}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
                Role: {data?.roles[0]}
            </Typography>

            <ToastContainer />

            <EditProfileModal open={openModal} onClose={handleCloseModal} />
        </Box>
    );
};


