const { Router } = require('express');
const { check } = require('express-validator');
const { postFactura, getFacturas, getFacturaPorID } = require('../controllers/factura');

//Controllers
// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Manejo de rutas

router.get('/mostrar', getFacturas);

 router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    validarCampos
], getFacturaPorID);
    
//Crear factura
router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],postFactura);


module.exports = router;