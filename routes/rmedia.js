// Importamos modulo de Express para trabajar la Ruta
const { Router } = require('express');
// Importamos los metodos creados en controllers
const {
    CreateMedia,
    GetMediabyID,
    GetMedia,
    UpdateMedia,
    DeleteMedia
} = require('../control/cmedia');
// Creamos una instancia del objeto route

const router = Router();

// Create (necesita recibir cuerpo)
router.post('/', CreateMedia)

// Read
router.get('/', GetMedia)
router.get('/:id', GetMediabyID)

// Update
router.put('/:id', UpdateMedia)

// Delete
router.delete('/:id', DeleteMedia)

//Exportacion de rutas(routes)
module.exports = router;