const router = require('express').Router();
const userController = require('../controllers/user.controller');
const pelElphaController = require('../controllers/pelelpha.controller');
const middleware = require('../middleware/auth.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', middleware, userController.getUser);
router.put('/profile/edit', middleware, userController.editUser);

router.get('/pel-elpha', middleware, pelElphaController.getAll);
router.post('/pel-elpha', middleware, pelElphaController.create);
router.put('/pel-elpha/:id', middleware, pelElphaController.update);
router.delete('/pel-elpha/:id', middleware, pelElphaController.delete);

module.exports = router;
