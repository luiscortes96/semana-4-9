const router = require('express').Router();
const categoriarouter = require('./api/categoria');
const loginrouter = require('./api/login');
const articulorouter = require('./api/articulo');



router.use('/categoria',categoriarouter);
router.use('/articulo', articulorouter);
router.use('/usuario', loginrouter);

module.exports = router;