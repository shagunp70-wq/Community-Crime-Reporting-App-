import React, { useEffect, useState } from 'react'; 
import { 
View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, StyleSheet 
} from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; 
import api from '../../config/api'; 

const ComplaintsScreen = ({ navigation }) => { 
const [complaints, setComplaints] = useState([]); 
const [loading, setLoading] = useState(true); 

const handleBack = () => { 
Alert.alert('Session Ended', 'You have been logged out successfully!'); 
navigation.navigate('Login'); 
}; 

const fetchComplaints = async () => { 
try { 
setLoading(true); 
const response = await api.get('/api/complaints'); 
setComplaints(response.data.data); 
} catch (error) { 
if (error.response && error.response.status === 404) { 
setComplaints([]); 
} else { 
console.error('Error fetching complaints:', error); 
Alert.alert('Error', 'Failed to fetch complaints. Please try again.'); 
} 
} finally { 
setLoading(false); 
} 
}; 

useEffect(() => { 
fetchComplaints(); 
}, []); 

const getPriorityColor = (priority) => { 
switch (priority.toLowerCase()) { 
case 'high': return '#FF3B30'; 
case 'medium': return '#FF9500'; 
case 'low': return '#34C759'; 
default: return '#8E8E93'; 
} 
}; 

const getStatusIcon = (status) => { 
switch (status.toLowerCase()) { 
case 'pending': return { icon: 'time-outline', color: '#FF9500' }; 
case 'resolved': return { icon: 'checkmark-done-outline', color: '#34C759' }; 
case 'rejected': return { icon: 'close-outline', color: '#FF3B30' }; 
default: return { icon: 'alert-circle-outline', color: '#8E8E93' }; 
} 
}; 

const renderComplaint = ({ item }) => { 
const statusIcon = getStatusIcon(item.status); 
return ( 
<View style={styles.card}> 
<View style={styles.cardHeader}> 
<View style={styles.cardTitleContainer}> 
<Ionicons name="warning" size={22} color="#FF5722" /> 
<Text style={styles.cardTitle}>{item.title}</Text> 
</View> 
<View style={[styles.statusBadge, { backgroundColor: `${statusIcon.color}20` }]}> 
<Ionicons name={statusIcon.icon} size={16} color={statusIcon.color} /> 
<Text style={[styles.statusText, { color: statusIcon.color }]}> 
{item.status} 
</Text> 
</View> 
</View> 
<View style={styles.detailRow}> 
<Text style={styles.detailLabel}>Priority:</Text> 
<View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(item.priority)}20` }]}> 
<Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}> 
{item.priority} 
</Text> 
</View> 
</View> 
<View style={styles.detailRow}> 
<Text style={styles.detailLabel}>Date:</Text> 
<Text style={styles.detailValue}> 
{new Date(item.createdAt).toLocaleDateString('en-GB')} 
</Text> 
</View> 
<Text style={styles.descriptionLabel}>Description</Text> 
<Text style={styles.descriptionText}>{item.description}</Text> 
</View> 
); 
}; 

if (loading) { 
return ( 
<View style={styles.loadingContainer}> 
<ActivityIndicator size="large" color="#007AFF" /> 
<Text style={styles.loadingText}>Loading complaints...</Text> 
</View> 
); 
} 

return ( 
<View style={styles.container}> 
<View style={styles.header}> 
<TouchableOpacity onPress={handleBack}> 
<Ionicons name="arrow-back" size={24} color="#007AFF" /> 
</TouchableOpacity> 
<Text style={styles.headerTitle}>Your Complaints</Text> 
<TouchableOpacity onPress={fetchComplaints}> 
<Ionicons name="refresh" size={24} color="#007AFF" /> 
</TouchableOpacity> 
</View> 
{complaints.length === 0 ? ( 
<View style={styles.emptyState}> 
<Ionicons name="document-text-outline" size={60} color="#D1D1D6" /> 
<Text style={styles.emptyStateText}>No complaints found</Text> 
<Text style={styles.emptyStateSubtext}>Tap below to report a new issue</Text> 
</View> 
) : ( 
<FlatList 
data={complaints} 
keyExtractor={(item) => item._id} 
renderItem={renderComplaint} 
contentContainerStyle={styles.listContent} 
showsVerticalScrollIndicator={false} 
/> 
)} 
<TouchableOpacity 
style={styles.fab} 
onPress={() => navigation.navigate('Report')} 
activeOpacity={0.9} 
> 
<Ionicons name="add" size={28} color="#FFFFFF" /> 
</TouchableOpacity> 
</View> 
); 
}; 

const styles = StyleSheet.create({ 
container: { flex: 1, backgroundColor: '#F8F9FA', paddingHorizontal: 16, paddingTop: 20 }, 
loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' }, 
loadingText: { marginTop: 12, color: '#8E8E93', fontSize: 16 }, 
header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }, 
headerTitle: { fontSize: 28, fontWeight: '700', color: '#1C1C1E' }, 
listContent: { paddingBottom: 30 }, 
card: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 }, 
cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, 
cardTitleContainer: { flexDirection: 'row', alignItems: 'center' }, 
cardTitle: { fontSize: 20, fontWeight: '600', color: '#1C1C1E', marginLeft: 8 }, 
statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }, 
statusText: { fontSize: 14, fontWeight: '500', marginLeft: 4 }, 
detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 }, 
detailLabel: { fontSize: 14, color: '#8E8E93', width: 80 }, 
detailValue: { fontSize: 14, color: '#1C1C1E', fontWeight: '500' }, 
descriptionLabel: { fontSize: 14, color: '#8E8E93', marginTop: 12, marginBottom: 4 }, 
descriptionText: { fontSize: 14, color: '#1C1C1E', lineHeight: 22 }, 
priorityBadge: { borderRadius: 4, paddingHorizontal: 8, paddingVertical: 2 }, 
priorityText: { fontSize: 13, fontWeight: '600', textTransform: 'capitalize' }, 
emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 }, 
emptyStateText: { fontSize: 18, color: '#8E8E93', marginTop: 16, fontWeight: '500' }, 
emptyStateSubtext: { fontSize: 14, color: '#C7C7CC', marginTop: 4 }, 
fab: { position: 'absolute', right: 24, bottom: 24, backgroundColor: '#007AFF', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 6 }, 
}); 

export default ComplaintsScreen;