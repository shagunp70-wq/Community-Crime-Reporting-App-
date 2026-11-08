const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); 

const register = async (req, res) => { 
const { name, email, password } = req.body; 
try { 
const user = await User.findOne({ email }); 
if (user) return res.status(400).json({ msg: 'User exists' }); 
const newUser = new User({ 
name, 
email, 
password: await bcrypt.hash(password, 10) 
}); 

await newUser.save(); 
const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
res.status(201).json({ token, user: { id: newUser._id, name, email } }); 
} catch (error) { 
res.status(500).json({ msg: 'Server error' }); 
} 
}; 

const login = async (req, res) => { 
const { email, password } = req.body; 
try { 
const user = await User.findOne({ email }); 
if (!user || !(await bcrypt.compare(password, user.password))) { 
return res.status(400).json({ msg: 'Invalid credentials' }); 
} 
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
res.json({ token, user: { id: user._id, name: user.name, email } }); 
} catch (error) { 
res.status(500).json({ msg: 'Server error' }); 
} 
}; 

module.exports = { register, login };