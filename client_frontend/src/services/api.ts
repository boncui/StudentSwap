import axios from 'axios';

const API = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`,
  });  

//LOGIN
export const login = async (email: string, password: string) => {
    const response = await API.post('/users/login', {email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
};

//REGISTER
export const register = async (userData: {
    fullName: string, 
    email: string, 
    password: string
}) => {
    const response = await API.post('/users/create', userData);
    return response.data;
};



