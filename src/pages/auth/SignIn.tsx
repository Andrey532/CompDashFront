import React, { useState } from 'react';
import styles from "./SignIn.module.css";
import { loginUser } from '../../api/auth';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { emailConfig, passwordConfig } from './SignUp';
import { toast, ToastContainer } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';

export type SignInFormInput = {
    email: string;
    password: string;
};

export const SignIn: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormInput>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            toast.success(data.message, { containerId: "signInFormToast" });
            setLoading(true);
            setTimeout(() => {
                navigate('/main');
                setLoading(false);
            }, 1500);
        },
        onError: (error: any) => {
            toast.error(error.message, { containerId: "signInFormToast" });
        },
    });

    const onSubmit: SubmitHandler<SignInFormInput> = (data) => {
        mutation.mutate(data);
    };

    return (
        <Box className={styles.container}>
            <Typography variant="h4" gutterBottom>
                Sign In
            </Typography>

            {loading && (
                <Box className={styles.loaderContainer}>
                    <CircularProgress />
                </Box>
            )}
            {!loading && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            {...register('email', emailConfig)}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            {...register('password', passwordConfig)}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Box>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Sign In
                    </Button>
                </form>
            )}
            <ToastContainer containerId="signInFormToast" position="top-center" className={styles.toastContainer} />
        </Box>
    );
};