const express = require('express');
const { register, login } = require('../controllers/admin/authController');
const { getAllAssignments } = require('../controllers/admin/assignmentController');
const { acceptAssignments,rejectAssignments } = require('../controllers/admin/assignmentController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.get('/assignments',adminMiddleware, getAllAssignments);  
router.post('/assignments/:id/accept',adminMiddleware, acceptAssignments); 
router.post('/assignments/:id/reject',adminMiddleware, rejectAssignments);  

module.exports = router;
