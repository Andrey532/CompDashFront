import axios from "axios";
import { RegisterFormInput } from "../pages/auth/SignUp";

export const registerUser = async (newUser: RegisterFormInput) => {
    try {
        const response = await axios.post("http://localhost:3001/auth/sign-up", newUser);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Registration failed');
        }
    }
};

export const loginUser = async (userData: { email: string; password: string }) => {
    try {
        const response = await axios.post("http://localhost:3001/auth/sign-in", userData);
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
};