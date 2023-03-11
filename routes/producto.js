const { Router } = require('express');
const { check } = require('express-validator');
const { postProducto, putProducto, deleteProducto, getProductos, getProductoPorID, getProductosAgotados, getProductosMasvendidos } = require('../controllers/producto');
const { existeProductoPorId } = require('../helpers/db-validators');

//Controllers
// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

//Manejo de rutas

router.get('/mostrar', getProductos);

router.get('/productosMasVendidos', getProductosMasvendidos);

router.get('/productosAgotados', getProductosAgotados);

router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], getProductoPorID);
    
router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],postProducto);

router.put('/editar/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], putProducto)

router.delete('/eliminar/:id',[
    validarJWT, 
    esAdminRole,
    check('id', 'No es un id valido.').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],

deleteProducto)


module.exports = router;