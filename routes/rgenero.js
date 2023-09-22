// Importamos modulo de Express para trabajar la Ruta
const { Router } = require('express');
// Importamos los metodos creados en controllers
const {
    createGen,
    getGenbyID,
    getGen,
    updateGen,
    deleteGen
} = require('../control/cgenero');
// Creamos una instancia del objeto route

const router = Router();

// Create (necesita recibir cuerpo)
router.post('/', createGen)

// Read
router.get('/', getGen)
router.get('/:id', getGenbyID)

// Update
router.put('/:id', updateGen)

// Delete
router.delete('/:id', deleteGen)

//Exportacion de rutas(routes)
module.exports = router;