// Importamos modulo de Express para trabajar la Ruta
const { Router } = require('express');
// Importamos los metodos creados en controllers
const {
    createPro,
    getProbyID,
    getPro,
    updatePro,
    deletePro
} = require('../control/cproductora');
// Creamos una instancia del objeto route

const router = Router();

// Create (necesita recibir cuerpo)
router.post('/', createPro)

// Read
router.get('/', getPro)
router.get('/:id', getProbyID)

// Update
router.put('/:id', updatePro)

// Delete
router.delete('/:id', deletePro)

//Exportacion de rutas(routes)
module.exports = router;