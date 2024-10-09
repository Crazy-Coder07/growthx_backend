const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    submittedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'Accepted', 'Rejected'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
