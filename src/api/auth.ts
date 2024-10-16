import axios from "axios";
import { RegisterFormInput } from "../pages/auth/SignUp";

const API_URL = "http://localhost:3001/auth";

const handleError = (error: any) => {
    if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
    } else {
        throw new Error("An error occurred");
    }
};

export const registerUser = async (newUser: RegisterFormInput) => {
    try {
        const response = await axios.post(`${API_URL}/sign-up`, newUser);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const loginUser = async (userData: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/sign-in`, userData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/logout`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};