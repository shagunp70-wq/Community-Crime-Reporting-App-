const submitReport = async () => { 
try { 
await axios.post( 
'https://your-backend.com/api/complaints/submit', 
{ 
description, 
imageUrl 
}, 
{ 
headers: { 
Authorization: `Bearer ${userToken}` 
} 
} 
); 
Alert.alert('Success', 'Report submitted!'); 
} catch (error) { 
Alert.alert('Error', 'Failed to submit report.'); 
} 
};