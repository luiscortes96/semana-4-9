const router = require('express').Router();
const loginController = require('../../controllers/LoginController.js');



router.post('/login' ,loginController.login);

module.exports = router;