const { Router } = require('express');
const authController = require('../../controllers/auth.controller');

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/getAll', authController.getAll);

module.exports = router;
