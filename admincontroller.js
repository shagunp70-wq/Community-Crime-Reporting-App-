const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const Admin = require('../models/Admin'); 

exports.registerAdmin = async (req, res) => { 
try { 
const { name, email, password } = req.body; 
if (await Admin.findOne({ email })) { 
return res.status(400).json({ msg: 'Admin exists' }); 
} 
const admin = await Admin.create({ 
name, 
email, 
password: await bcrypt.hash(password, 10) 
}); 
res.status(201).json({ msg: 'Admin registered' }); 
} catch (error) { 
res.status(500).json({ msg: 'Registration failed' }); 
} 
}; 

exports.loginAdmin = async (req, res) => { 
try { 
const { email, password } = req.body; 
const admin = await Admin.findOne({ email }); 
if (!admin || !(await bcrypt.compare(password, admin.password))) { 
return res.status(400).json({ msg: 'Invalid credentials' }); 
} 
const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { 
expiresIn: '2h' 
}); 
res.json({ 
token, 
admin: { id: admin._id, name: admin.name, email } 
}); 
} catch (error) { 
res.status(500).json({ msg: 'Login failed' }); 
} 
}; 

exports.getAdminProfile = async (req, res) => { 
try { 
const admin = await Admin.findById(req.admin.id).select('-password'); 
res.json(admin || { msg: 'Admin not found' }); 
} catch (error) { 
res.status(500).json({ msg: 'Profile fetch failed' }); 
} 
};