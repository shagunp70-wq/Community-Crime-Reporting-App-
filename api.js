import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { API_URL } from '@env'; 

const api = axios.create({ 
baseURL: API_URL, 
timeout: 10000, 
}); 

// Interceptor to attach token to headers 
api.interceptors.request.use( 
async (config) => { 
try { 
const token = await AsyncStorage.getItem('userToken'); 
if (token) { 
config.headers.Authorization = `Bearer ${token}`; 
} 
} catch (error) { 
console.error('Error retrieving token:', error); 
} 
return config; 
}, 
(error) => Promise.reject(error) 
); 

// Login API: Authenticates user and stores token 
export const login = async (email, password) => { 
try { 
const response = await api.post('/api/users/login', { email, password }); 
const { token } = response.data; 
await AsyncStorage.setItem('userToken', token); 
return response.data; 
} catch (error) { 
console.error('Login API Error:', error.response?.data || error.message); 
throw error.response?.data || error.message; 
} 
}; 

// Signup API: Registers user and stores token 
export const signup = async (name, email, password) => { 
try { 
const response = await api.post('/api/users/register', { name, email, password }); 
const { token } = response.data; 
await AsyncStorage.setItem('userToken', token); 
return response.data; 
} catch (error) { 
console.error('Signup API Error:', error.response?.data || error.message); 
throw error.response?.data || error.message; 
} 
}; 

export default api;