exports.submitComplaint = async (req, res) => { 
try { 
const { description, imageUrl } = req.body; 
const complaint = new Complaint({ 
userId: req.user.id, 
description, 
imageUrl, 
createdAt: new Date() 
}); 
await complaint.save(); 
res.status(201).json({ message: 'Complaint submitted successfully' }); 
} catch (error) { 
res.status(500).json({ message: 'Server error' }); 
} 
};