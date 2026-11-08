const mongoose = require('mongoose'); 

const complaintSchema = new mongoose.Schema({ 
title: { type: String, required: true }, 
description: { type: String, required: true }, 
status: { 
type: String, 
enum: ['open', 'closed', 'pending', 'resolved'], 
default: 'open' 
}, 
priority: { 
type: String, 
enum: ['low', 'medium', 'high'], 
default: 'medium' 
}, 
createdAt: { type: Date, default: Date.now }, 
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
}); 

module.exports = mongoose.model('Complaint', complaintSchema);