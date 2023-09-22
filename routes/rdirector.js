// Importamos modulo de Express para trabajar la Ruta
const { Router } = require('express');
// Importamos los metodos creados en controllers
const {
    createDir,
    getDirbyID,
    getDir,
    updateDir,
    deleteDir
} = require('../control/cdirector');
// Creamos una instancia del objeto route

const router = Router();

// Create (necesita recibir cuerpo)
router.post('/', createDir)

// Read
router.get('/', getDir)
router.get('/:id', getDirbyID)

// Update
router.put('/:id', updateDir)

// Delete
router.delete('/:id', deleteDir)

//Exportacion de rutas(routes)
module.exports = router;