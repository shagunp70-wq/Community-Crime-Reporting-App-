import React, { useState, useContext, useEffect } from 'react'; 
import { 
View, 
Text, 
TextInput, 
TouchableOpacity, 
StyleSheet, 
KeyboardAvoidingView, 
Platform, 
Alert, 
ActivityIndicator, 
useColorScheme, 
Appearance, 
Modal 
} from 'react-native'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { login } from '../../config/api'; 
import AuthContext from '../../context/AuthContext'; 

const LoginScreen = ({ navigation }) => { 
const [email, setEmail] = useState(''); 
const [password, setPassword] = useState(''); 
const [loading, setLoading] = useState(false); 
const [showPassword, setShowPassword] = useState(false); 
const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark'); 
const [disclaimerVisible, setDisclaimerVisible] = useState(true); 
const [agreed, setAgreed] = useState(false); 
const { setUserToken } = useContext(AuthContext); 

useEffect(() => { 
const subscription = Appearance.addChangeListener(({ colorScheme }) => { 
setIsDarkMode(colorScheme === 'dark'); 
}); 
return () => subscription.remove(); 
}, []); 

const handleLogin = async () => { 
if (!email.trim() || !password.trim()) { 
Alert.alert('Error', 'Please fill all fields'); 
return; 
} 
try { 
setLoading(true); 
const response = await login(email, password); 
setUserToken(response.token); 
navigation.replace('Complaints'); 
} catch (error) { 
Alert.alert('Error', error.msg || 'Login failed'); 
} finally { 
setLoading(false); 
} 
}; 

const handleAgreeDisclaimer = () => { 
setDisclaimerVisible(false); 
}; 

const styles = getStyles(isDarkMode); 

return ( 
<View style={styles.container}> 
{/* Disclaimer Modal */} 
<Modal visible={disclaimerVisible} animationType="slide" transparent={true}> 
<View style={styles.modalOverlay}> 
<View style={styles.modalContent}> 
<Text style={styles.modalTitle}>Legal Disclaimer & Terms of Use</Text> 
<Text style={styles.modalText}>[Disclaimer Text]</Text> 
{/* Agreement Checkbox */} 
<TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgreed(!agreed)}> 
<View style={[styles.checkbox, agreed && styles.checkedBox]}> 
{agreed && ( 
<MaterialIcons name="check" size={16} color={isDarkMode ? '#000' : '#FFF'} /> 
)} 
</View> 
<Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text> 
</TouchableOpacity> 
{/* Continue Button */} 
<TouchableOpacity 
style={[styles.modalButton, !agreed && styles.disabledButton]} 
onPress={handleAgreeDisclaimer} 
disabled={!agreed} 
> 
<Text style={styles.modalButtonText}>Continue</Text> 
</TouchableOpacity> 
</View> 
</View> 
</Modal> 

{/* Main Login Form */} 
<KeyboardAvoidingView 
behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
style={styles.keyboardContainer} 
> 
{/* Theme Toggle */} 
<TouchableOpacity style={styles.themeToggle} onPress={() => setIsDarkMode(!isDarkMode)}> 
<MaterialIcons 
name={isDarkMode ? 'wb-sunny' : 'nights-stay'} 
size={24} 
color={isDarkMode ? '#FFD700' : '#333'} 
/> 
</TouchableOpacity> 
{/* Header */} 
<View style={styles.header}> 
<Text style={styles.greeting}>Welcome Back</Text> 
<Text style={styles.subtitle}>Sign in to continue</Text> 
</View> 
{/* Form Card */} 
<View style={styles.formCard}> 
{/* Email Input */} 
<View style={styles.inputGroup}> 
<Text style={styles.inputLabel}>Email</Text> 
<View style={styles.inputContainer}> 
<MaterialIcons name="email" size={20} color={isDarkMode ? '#FFD700' : '#5D5FEF'} style={styles.inputIcon} /> 
<TextInput 
style={styles.input} 
placeholder="your@email.com" 
placeholderTextColor={isDarkMode ? '#777' : '#999'} 
value={email} 
onChangeText={setEmail} 
keyboardType="email-address" 
autoCapitalize="none" 
/> 
</View> 
</View> 
{/* Password Input */} 
<View style={styles.inputGroup}> 
<Text style={styles.inputLabel}>Password</Text> 
<View style={styles.inputContainer}> 
<MaterialIcons name="lock" size={20} color={isDarkMode ? '#FFD700' : '#5D5FEF'} style={styles.inputIcon} /> 
<TextInput 
style={styles.input} 
placeholder="••••••••" 
placeholderTextColor={isDarkMode ? '#777' : '#999'} 
value={password} 
onChangeText={setPassword} 
secureTextEntry={!showPassword} 
/> 
<TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}> 
<MaterialIcons 
name={showPassword ? 'visibility-off' : 'visibility'} 
size={20} 
color={isDarkMode ? '#FFD700' : '#5D5FEF'} 
/> 
</TouchableOpacity> 
</View> 
</View> 
{/* Login Button */} 
<TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}> 
{loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Login</Text>} 
</TouchableOpacity> 
{/* Footer Links */} 
<View style={styles.footer}> 
<TouchableOpacity onPress={() => navigation.navigate('Signup')}> 
<Text style={styles.footerLink}>Create account</Text> 
</TouchableOpacity> 
<TouchableOpacity onPress={() => navigation.navigate('AdminLogin')}> 
<Text style={styles.adminLink}>Admin Login</Text> 
</TouchableOpacity> 
</View> 
</View> 
</KeyboardAvoidingView> 
</View> 
); 
}; 

const getStyles = (isDarkMode) => StyleSheet.create({ 
container: { 
flex: 1, 
backgroundColor: isDarkMode ? '#121212' : '#F8F9FA', 
padding: 20, 
}, 
keyboardContainer: { 
flex: 1, 
justifyContent: 'center', 
}, 
themeToggle: { 
position: 'absolute', 
top: Platform.OS === 'ios' ? 50 : 30, 
right: 20, 
zIndex: 10, 
}, 
header: { 
marginBottom: 30, 
alignItems: 'center', 
}, 
greeting: { 
fontSize: 28, 
fontWeight: 'bold', 
color: isDarkMode ? '#FFF' : '#000', 
marginBottom: 5, 
}, 
subtitle: { 
fontSize: 16, 
color: isDarkMode ? '#AAA' : '#666', 
}, 
formCard: { 
backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF', 
borderRadius: 15, 
padding: 20, 
shadowColor: '#000', 
shadowOffset: { width: 0, height: 2 }, 
shadowOpacity: isDarkMode ? 0.3 : 0.1, 
shadowRadius: 6, 
elevation: 3, 
}, 
inputGroup: { 
marginBottom: 20, 
}, 
inputLabel: { 
fontSize: 14, 
color: isDarkMode ? '#DDD' : '#555', 
marginBottom: 8, 
}, 
inputContainer: { 
flexDirection: 'row', 
alignItems: 'center', 
backgroundColor: isDarkMode ? '#333' : '#F2F2F7', 
borderRadius: 10, 
paddingHorizontal: 15, 
height: 50, 
}, 
input: { 
flex: 1, 
color: isDarkMode ? '#FFF' : '#000', 
paddingLeft: 10, 
}, 
inputIcon: { 
marginRight: 10, 
}, 
eyeIcon: { 
padding: 8, 
}, 
loginButton: { 
backgroundColor: '#007AFF', 
borderRadius: 10, 
padding: 15, 
alignItems: 'center', 
marginTop: 10, 
}, 
loginButtonText: { 
color: '#FFF', 
fontSize: 16, 
fontWeight: 'bold', 
}, 
footer: { 
flexDirection: 'row', 
justifyContent: 'space-between', 
marginTop: 20, 
}, 
footerLink: { 
color: '#007AFF', 
fontSize: 14, 
}, 
adminLink: { 
color: '#FF5722', 
fontSize: 14, 
fontWeight: 'bold', 
}, 
modalOverlay: { 
flex: 1, 
backgroundColor: 'rgba(0,0,0,0.7)', 
justifyContent: 'center', 
alignItems: 'center', 
}, 
modalContent: { 
backgroundColor: isDarkMode ? '#333' : '#FFF', 
padding: 20, 
marginHorizontal: 20, 
borderRadius: 10, 
maxHeight: '80%', 
}, 
modalTitle: { 
fontSize: 20, 
fontWeight: 'bold', 
marginBottom: 15, 
color: isDarkMode ? '#FFF' : '#000', 
}, 
modalText: { 
fontSize: 14, 
marginBottom: 10, 
color: isDarkMode ? '#DDD' : '#333', 
}, 
modalButton: { 
backgroundColor: '#007AFF', 
borderRadius: 5, 
paddingVertical: 10, 
alignItems: 'center', 
marginTop: 10, 
}, 
modalButtonText: { 
color: '#FFF', 
fontSize: 16, 
fontWeight: 'bold', 
}, 
checkboxContainer: { 
flexDirection: 'row', 
alignItems: 'center', 
marginTop: 15, 
marginBottom: 10, 
}, 
checkbox: { 
width: 20, 
height: 20, 
borderWidth: 2, 
borderColor: isDarkMode ? '#FFF' : '#000', 
borderRadius: 4, 
marginRight: 10, 
justifyContent: 'center', 
alignItems: 'center', 
}, 
checkedBox: { 
backgroundColor: isDarkMode ? '#FFF' : '#007AFF', 
borderColor: isDarkMode ? '#FFF' : '#007AFF', 
}, 
checkboxLabel: { 
color: isDarkMode ? '#DDD' : '#333', 
fontSize: 14, 
}, 
disabledButton: { 
opacity: 0.6, 
}, 
}); 

export default LoginScreen;