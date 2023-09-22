// Importamos modulo de Express para trabajar la Ruta
const { Router } = require('express');
// Importamos los metodos creados en controllers
const {
    createTipo,
    getTipobyID,
    getTipo,
    updateTipo,
    deleteTipo
} = require('../control/ctipo');
// Creamos una instancia del objeto route

const router = Router();

// Create (necesita recibir cuerpo)
router.post('/', createTipo)

// Read
router.get('/', getTipo)
router.get('/:id', getTipobyID)

// Update
router.put('/:id', updateTipo)

// Delete
router.delete('/:id', deleteTipo)

//Exportacion de rutas(routes)
module.exports = router;