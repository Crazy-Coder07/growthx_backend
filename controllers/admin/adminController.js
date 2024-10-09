const Assignment = require('../../models/assignmentModel');
const User = require('../../models/userModel');

exports.adminlist = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' });
        
        if (!admins || admins.length === 0) {
            return res.status(404).json({ message: 'No admins found' });
        }
        res.status(200).json({
            message: 'Admin list fetched successfully',
            admins
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
