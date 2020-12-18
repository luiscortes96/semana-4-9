const router = require('express').Router();
const categoriaController = require('../../controllers/CategoriaController.js');
const auth = require('../../middlewares/auth')


router.post('/add', auth.verificarAdministrador ,categoriaController.add);
router.get('/list', auth.verificarAdministrador ,categoriaController.list);
router.put('/update', auth.verificarAdministrador ,categoriaController.update);
router.put('/activate', auth.verificarAdministrador ,categoriaController.activate);
router.put('/deactivate', auth.verificarAdministrador ,categoriaController.deactivate);

module.exports = router;