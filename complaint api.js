import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { API_URL } from '@env'; 

const getToken = async () => { 
try { 
return await AsyncStorage.getItem('userToken'); 
} catch (error) { 
console.error('Error getting token:', error); 
return null; 
} 
}; 

export const createComplaint = async (title, description) => { 
try { 
const token = await getToken(); 
if (!token) throw new Error('No token found'); 
const response = await axios.post(`${API_URL}/api/complaints`, { title, description }, { 
headers: { Authorization: `Bearer ${token}` } 
}); 
return response.data; 
} catch (error) { 
console.error('Create Complaint Error:', error.response?.data || error.message); 
throw error.response?.data || error.message; 
} 
}; 

export const getAllComplaints = async () => { 
try { 
const token = await getToken(); 
if (!token) throw new Error('No token found'); 
const response = await axios.get(`${API_URL}/api/complaints`, { 
headers: { Authorization: `Bearer ${token}` } 
}); 
return response.data; 
} catch (error) { 
console.error('Get Complaints Error:', error.response?.data || error.message); 
throw error.response?.data || error.message; 
} 
}; 

export const deleteComplaint = async (id) => { 
try { 
const token = await getToken(); 
if (!token) throw new Error('No token found'); 
const response = await axios.delete(`${API_URL}/api/complaints/${id}`, { 
headers: { Authorization: `Bearer ${token}` } 
}); 
return response.data; 
} catch (error) { 
console.error(' Delete Complaint Error:', error.response?.data || error.message); 
throw error.response?.data || error.message; 
} 
};