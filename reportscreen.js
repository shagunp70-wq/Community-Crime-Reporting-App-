import React, { useState } from 'react'; 
import { 
View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, 
StyleSheet, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; 
import api from '../../config/api'; 

const ReportScreen = ({ navigation }) => { 
const [formData, setFormData] = useState({ 
title: '', 
description: '', 
priority: 'low', 
category: 'general' 
}); 
const [loading, setLoading] = useState(false); 
const [success, setSuccess] = useState(false); 
const [complaintId, setComplaintId] = useState(''); 

const priorities = [ 
{ label: 'Low', value: 'low', color: '#34C759' }, 
{ label: 'Medium', value: 'medium', color: '#FF9500' }, 
{ label: 'High', value: 'high', color: '#FF3B30' } 
]; 

const categories = [ 
{ label: 'General', value: 'general', icon: 'help-circle-outline' }, 
{ label: 'Technical', value: 'technical', icon: 'hardware-chip-outline' }, 
{ label: 'Billing', value: 'billing', icon: 'card-outline' }, 
{ label: 'Service', value: 'service', icon: 'construct-outline' } 
]; 

const validateForm = () => { 
if (!formData.title.trim() || !formData.description.trim()) { 
Alert.alert('Missing Information', 'Please provide both title and description'); 
return false; 
} 
return true; 
}; 

const handleSubmit = async () => { 
if (!validateForm()) return; 
try { 
setLoading(true); 
const response = await api.post('/api/complaints', { 
...formData, 
status: 'pending' 
}); 
setComplaintId(response.data.data._id); 
setSuccess(true); 
} catch (error) { 
console.error('Submission error:', error); 
Alert.alert('Error', 'Failed to submit complaint. Please try again.'); 
} finally { 
setLoading(false); 
} 
}; 

if (success) { 
return ( 
<View style={styles.successContainer}> 
<Ionicons name="checkmark-circle" size={90} color="#34C759" /> 
<Text style={styles.successText}>Complaint Registered Successfully!</Text> 
<Text style={styles.successSubText}>Complaint ID: {complaintId}</Text> 
<TouchableOpacity 
style={styles.successButton} 
onPress={() => { 
setSuccess(false); 
navigation.goBack(); 
}} 
> 
<Text style={styles.successButtonText}>Return to Home</Text> 
</TouchableOpacity> 
</View> 
); 
} 

return ( 
<KeyboardAvoidingView 
behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
style={styles.container} 
> 
<ScrollView contentContainerStyle={styles.scrollContainer}> 
<View style={styles.header}> 
<TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}> 
<Ionicons name="arrow-back" size={24} color="#007AFF" /> 
</TouchableOpacity> 
<Text style={styles.headerTitle}>New Complaint</Text> 
</View> 
<View style={styles.formCard}> 
<Text style={styles.sectionTitle}>Basic Information</Text> 
<View style={styles.inputGroup}> 
<Text style={styles.inputLabel}>Title*</Text> 
<TextInput 
style={styles.input} 
placeholder="Enter complaint title" 
placeholderTextColor="#8E8E93" 
value={formData.title} 
onChangeText={(text) => setFormData({ ...formData, title: text })} 
/> 
</View> 
<View style={styles.inputGroup}> 
<Text style={styles.inputLabel}>Description*</Text> 
<TextInput 
style={[styles.input, styles.textArea]} 
placeholder="Describe the issue in detail" 
placeholderTextColor="#8E8E93" 
value={formData.description} 
onChangeText={(text) => setFormData({ ...formData, description: text })} 
multiline 
numberOfLines={5} 
textAlignVertical="top" 
/> 
</View> 
<Text style={styles.sectionTitle}>Classification</Text> 
<View style={styles.inputGroup}> 
<Text style={styles.inputLabel}>Priority</Text> 
<View style={styles.optionGroup}> 
{priorities.map((item) => ( 
<TouchableOpacity 
key={item.value} 
style={[ 
styles.optionButton, 
formData.priority === item.value && { 
backgroundColor: `${item.color}20`, 
borderColor: item.color, 
}, 
]} 
onPress={() => setFormData({ ...formData, priority: item.value })} 
> 
<View style={[styles.optionIndicator, { backgroundColor: item.color }]} /> 
<Text style={styles.optionText}>{item.label}</Text> 
</TouchableOpacity> 
))} 
</View> 
</View> 
<View style={styles.inputGroup}> 
<Text style={styles.inputLabel}>Category</Text> 
<View style={styles.categoryGrid}> 
{categories.map((item) => ( 
<TouchableOpacity 
key={item.value} 
style={[ 
styles.categoryButton, 
formData.category === item.value && styles.categoryButtonActive, 
]} 
onPress={() => setFormData({ ...formData, category: item.value })} 
> 
<Ionicons 
name={item.icon} 
size={20} 
color={formData.category === item.value ? '#007AFF' : '#8E8E93'} 
/> 
<Text 
style={[ 
styles.categoryText, 
formData.category === item.value && { color: '#007AFF' }, 
]} 
> 
{item.label} 
</Text> 
</TouchableOpacity> 
))} 
</View> 
</View> 
</View> 
<TouchableOpacity 
style={styles.submitButton} 
onPress={handleSubmit} 
disabled={loading} 
> 
{loading ? ( 
<ActivityIndicator color="#fff" /> 
) : ( 
<> 
<Ionicons name="paper-plane-outline" size={20} color="#fff" /> 
<Text style={styles.submitButtonText}>Submit Complaint</Text> 
</> 
)} 
</TouchableOpacity> 
</ScrollView> 
</KeyboardAvoidingView> 
); 
}; 

const styles = StyleSheet.create({ 
container: { flex: 1, backgroundColor: '#F8F9FA' }, 
scrollContainer: { padding: 16, paddingBottom: 30 }, 
header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 }, 
backButton: { marginRight: 16 }, 
headerTitle: { fontSize: 22, fontWeight: '600', color: '#1C1C1E' }, 
formCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, marginBottom: 20, elevation: 2 }, 
sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1C1C1E', marginBottom: 16, marginTop: 8 }, 
inputGroup: { marginBottom: 20 }, 
inputLabel: { fontSize: 14, fontWeight: '500', color: '#3A3A3C', marginBottom: 8 }, 
input: { backgroundColor: '#F2F2F7', borderRadius: 8, padding: 14, fontSize: 16, color: '#1C1C1E' }, 
textArea: { height: 120, textAlignVertical: 'top' }, 
optionGroup: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }, 
optionButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, borderWidth: 1, borderColor: '#E5E5EA', backgroundColor: '#F8F9FA', flex: 1, marginRight: 8 }, 
optionIndicator: { width: 12, height: 12, borderRadius: 6, marginRight: 8 }, 
optionText: { fontSize: 14, color: '#3A3A3C' }, 
categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 8 }, 
categoryButton: { width: '48%', flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 8, backgroundColor: '#F2F2F7', marginBottom: 8 }, 
categoryButtonActive: { backgroundColor: '#E5F0FF', borderColor: '#007AFF', borderWidth: 1 }, 
categoryText: { fontSize: 14, color: '#3A3A3C', marginLeft: 8 }, 
submitButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#007AFF', paddingVertical: 16, borderRadius: 12, elevation: 4 }, 
submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginLeft: 8 }, 
successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#F8F9FA' }, 
successText: { fontSize: 24, fontWeight: 'bold', color: '#34C759', marginVertical: 16, textAlign: 'center' }, 
successSubText: { fontSize: 16, color: '#333', marginBottom: 24, textAlign: 'center' }, 
successButton: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, elevation: 3 }, 
successButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' }, 
}); 

export default ReportScreen;