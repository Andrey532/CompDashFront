import React, { useState } from 'react';
import styles from "./SignUp.module.css"
import { registerUser } from '../../api/auth';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

export type RegisterFormInput = {
    email: string;
    password: string;
    confirmPassword: string;
    phone_number: number;
    first_name: string;
    last_name: string;
};

export const emailConfig = {
    required: "Email is required!",
    pattern: {
        value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
        message: "Please enter valid email!"
    }
}

export const passwordConfig = {
    required: "Password is required",
    minLength: {
        value: 7,
        message: "Min length is 7 symbols!",
    }
}

const phoneNumberConfig = {
    required: "Phone number is required",
    minLength: {
        value: 10,
        message: "Phone number must be at least 10 characters",
    }
}

export const SignUp: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInput>();

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast.success(data.message, {containerId: "registerFormToast"});
            setLoading(true);
            setTimeout(() => {
                navigate('/main');
                setLoading(false);
            }, 1500);
        },
        onError: (error: any) => {
            toast.error(error.message, {containerId: "registerFormToast"});
        },
    });

    const onSubmit: SubmitHandler<RegisterFormInput> = (data) => {
        // if (data.password !== data.confirmPassword) {
        //     toast.error('Passwords do not match!');
        //     return;
        // }
        mutation.mutate(data);
    };

    return (
        <Box className={styles.container}>
            <Link className={styles.link_signIn} to="/auth/sign-in">Sign In</Link>
            <Typography variant="h4" gutterBottom>
                Create an account
            </Typography>

            {loading && (
                <Box className={styles.loaderContainer}>
                    <CircularProgress />
                </Box>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        {...register('first_name', { required: 'First name is required' })}
                        error={!!errors.first_name}
                        helperText={errors.first_name?.message}
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        {...register('last_name', { required: 'Last name is required' })}
                        error={!!errors.last_name}
                        helperText={errors.last_name?.message}
                    />
                </Box>
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
                        type={showPassword ? "text" : "password"}
                        {...register('password', passwordConfig)}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        {...register('phone_number', phoneNumberConfig)}
                        error={!!errors.phone_number}
                        helperText={errors.phone_number?.message}
                    />
                </Box>
                {/* <Box sx={{ mb: 2 }}>
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        {...register('confirmPassword', { required: 'Confirm your password' })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                </Box> */}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Registration
                </Button>
            <ToastContainer containerId="registerFormToast" position="top-center" />
            </form>
        </Box>
    );
};