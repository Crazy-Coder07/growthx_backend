const express = require('express');
const { register, login } = require('../controllers/user/authController');
const { submitAssignment } = require('../controllers/user/assignmentController');
const userMiddleware = require('../middlewares/userMiddleware');
const { adminlist } = require('../controllers/admin/adminController');
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/submit', userMiddleware, submitAssignment);
router.get('/admin',userMiddleware,adminlist)


module.exports = router;
