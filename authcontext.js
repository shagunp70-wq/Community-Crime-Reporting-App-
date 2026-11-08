import React, { createContext, useState } from 'react'; 

const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => { 
const [userToken, setUserToken] = useState(null); 
const [isAdmin, setIsAdmin] = useState(false); 
const [loading, setLoading] = useState(false); 

const login = (token, admin = false) => { 
setUserToken(token); 
setIsAdmin(admin); 
}; 

const logout = () => { 
setUserToken(null); 
setIsAdmin(false); 
}; 

return ( 
<AuthContext.Provider value={{ 
userToken, 
setUserToken, 
isAdmin, 
setIsAdmin, 
login, 
logout, 
loading, 
setLoading 
}}> 
{children} 
</AuthContext.Provider> 
); 
}; 

export default AuthContext;