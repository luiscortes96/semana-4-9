const router = require('express').Router();
const articuloController = require('../../controllers/ArticuloController.js');



router.post('/add',articuloController.add);
router.get('/list',articuloController.list);
router.put('/update',articuloController.update);
router.put('/activate',articuloController.activate);
router.put('/deactivate',articuloController.deactivate);

module.exports = router;