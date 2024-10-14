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

export const logoutUser = async () => {
    const response = await axios.get("http://localhost:3001/auth/logout", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });
    
    return response.data;
    
};

// export const logoutUser = async () => {
//     const token = localStorage.getItem('access_token');
    
//     if (!token) {
//         throw new Error("Token not found");
//     }
    
//     console.log("Токен перед запитом на logout:", token); // Логування токена

//     const response = await axios.get("http://localhost:3001/auth/logout", {
//         headers: {
//             Authorization: `Bearer ${token}`, // Перевір правильність Bearer токена
//         },
//     });

//     return response.data;
// };