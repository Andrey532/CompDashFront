import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

export const fetchUserProfile = async (id: number | null): Promise<UserType> => {
    const response = await axiosInstance.get<UserType>(`http://localhost:3001/auth/${id}`);
    return response.data;
};

export const updateUserProfile = async (id: number, data: any) => {
  const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });
  if (!response.ok) {
      throw new Error('Failed to update profile');
  }
  return await response.json();
};

type CompanyType = {
            id: number,
            name: string,
            address: string,
            service_of_activity: string,
            number_of_employees: number,
            description: string,
            type: string,
            capital: number,
            logo: null,
            createdAt: string
}

export type UserType = {
    id: number,
    email: string,
    phone_number: string,
    first_name: string,
    last_name: string,
    roles: string[],
    createdAt: string,
    companies: CompanyType[]
        }
