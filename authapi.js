import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { API_URL } from '@env'; 

export const signup = async (name, email, password) => { 
try { 
const response = await axios.post(`${API_URL}/api/users/register`, { name, email, password }); 
const { token, user } = response.data; 
await AsyncStorage.setItem('userToken', token); 
await AsyncStorage.setItem('userData', JSON.stringify(user)); 
return response.data; 
} catch (error) { 
console.error('Signup Error:', error?.response?.data || error.message); 
throw new Error(error?.response?.data?.message || 'Registration failed'); 
} 
}; 

export const login = async (email, password) => { 
try { 
const response = await axios.post(`${API_URL}/api/users/login`, { email, password }); 
const { token, user } = response.data; 
await AsyncStorage.setItem('userToken', token); 
await AsyncStorage.setItem('userData', JSON.stringify(user)); 
return response.data; 
} catch (error) { 
console.error('Login Error:', error?.response?.data || error.message); 
throw new Error(error?.response?.data?.message || 'Login failed'); 
} 
}; 

export const logout = async () => { 
try { 
await AsyncStorage.removeItem('userToken'); 
await AsyncStorage.removeItem('userData'); 
console.log('User logged out'); 
} catch (error) { 
console.error('Logout Error:', error.message); 
throw new Error('Logout failed'); 
} 
};