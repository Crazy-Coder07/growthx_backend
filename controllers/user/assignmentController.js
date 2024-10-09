const Assignment = require('../../models/assignmentModel');
const User=require("../../models/userModel");

exports.submitAssignment = async (req, res) => {
    const { title, description, adminId } = req.body; 
    const userId = req.userId;

    try {
        const admin = await User.findById(adminId);
        if (!admin || admin.role !== 'admin') {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const newAssignment = new Assignment({
            title,
            description,
            submittedBy: userId,  
            submittedTo: adminId, 
        });

        await newAssignment.save();

        res.status(201).json({
            message: 'Assignment submitted successfully',
            assignment: newAssignment
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find().populate('submittedBy', 'name email');
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
