const Assignment = require('../../models/assignmentModel');
const User = require("../../models/userModel");

exports.getAllAssignments = async (req, res) => {
    const adminId  = req.adminId; 

    try {
        const admin = await User.findById(adminId);
        if (!admin || admin.role !== 'admin') {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const assignments = await Assignment.find({ submittedTo: adminId })
            .populate('submittedBy', 'name email')  
            .populate('submittedTo', 'name email'); 

        if (assignments.length === 0) {
            return res.status(404).json({ message: 'No assignments found for this admin' });
        }

        res.status(200).json({
            message: 'Assignments fetched successfully',
            assignments
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while fetching the assignment' });
    }
};

exports.acceptAssignments = async (req, res) => {
    const adminId = req.adminId; 
    const assignmentId = req.params.id;  

    try {
        const admin = await User.findById(adminId);
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: 'Admin authorization required' });
        }

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        if (assignment.submittedTo.toString() !== adminId) {
            return res.status(403).json({ message: 'You are not authorized to accept this assignment' });
        }

        assignment.status = 'Accepted';
        await assignment.save();

        res.status(200).json({
            message: 'Assignment accepted successfully',
            assignment
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while accepting the assignment' });
    }
};

exports.rejectAssignments = async (req, res) => {
    const adminId = req.adminId; 
    const assignmentId = req.params.id;  

    try {
        const admin = await User.findById(adminId);
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ message: 'Admin authorization required' });
        }

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        if (assignment.submittedTo.toString() !== adminId) {
            return res.status(403).json({ message: 'You are not authorized to reject this assignment' });
        }

        assignment.status = 'Rejected';
        await assignment.save();

        res.status(200).json({
            message: 'Assignment rejected successfully',
            assignment
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while accepting the assignment' });
    }
};
