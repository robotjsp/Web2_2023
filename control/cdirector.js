//Importamos desde la carpeta models el tipo que corresponde al archivo
//Procedemos a poner el mismo nombre del Alias exportado desde el "models"
const directorJSON = require('../model/director');
//Importa el tipo de dato
const { request, response } = require('express');

// Create (necesita recibir cuerpo) ------------------------------------
const createDir = async (req = request, res = response) => {
    //console.log(req.body)
    // Creamos una condicion
    try {
        const name = (req.body.name) ? req.body.name.toString() : '';
        const directorJSON_Query = await directorJSON.findOne({name})
        if (directorJSON_Query) {
            return res.status(400).json({ msg: 'File cdirector| ❌ Error: Nombre de director repetido. 🛈 Esta acción no modificará la DB' })
        }
        const data = {name}
        const JSON = new directorJSON(data)
        console.log(JSON)
        await JSON.save()
        //Crear respuesta positiva #201
        res.status(201).json(JSON)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cdirector| ❌ Error durante la solicitud para crear:', e })
    }
}
// Read by ID ------------------------------------------------------------
const getDirbyID = async (req = request, res = response) => {
    try {
        console.log(req.params)
        const id = req.params.id
        const query = { _id: id }
        const directorJSON_QuerybyId = await directorJSON.findOne(query)
        return res.json(directorJSON_QuerybyId)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cdirector| ❌ Error durante la lectura:',e })
    }
}

// Read All ------------------------------------------------------------
const getDir = async (req = request, res = response) => {
    try {
        console.log(req.query)
        const status = req.query.status
        const query = { status: status }
        const directorJSON_Query = await directorJSON.find(query)
        return res.json(directorJSON_Query)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cdirector| ❌ Error durante la lectura:',e })
    }
}


// Update------------------------------------------------------------
const updateDir = async (req = request, res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        const typeDeviceQuerybyId = await directorJSON.findById(id)
        //if(!typeDeviceQuerybyId){
        //    return console.log('Este dispositivo no existe')
        //}
        data.updatedate = new Date()
        console.log(data)
        const directorJSON_Query = await directorJSON.findByIdAndUpdate(id, data, {new:true})
        return res.json(directorJSON_Query)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: 'File cdirector| ❌ Error durante la actualizacion:',e})
    }
}



// Delete ------------------------------------------------------------
const deleteDir = async (req = request, res = response) => {
    try {
        console.log(req.params)
        const id = req.params.id
        const directorJSON_QuerybyId = await directorJSON.findById(id)
        if (!directorJSON_QuerybyId) {
            return res.status(404).json({ msg: 'File cdirector| 🛈 Este Id no existe en nuestra BD' })
        }
        await directorJSON.findByIdAndDelete(id)
        return res.status(404).json({ msg: 'File cdirector| ✔️ Elemento eliminado con exito' })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cdirector| ❌ Error durante la solicitud para eliminar:', e })
    }
}
module.exports = {
    createDir,
    getDirbyID,
    getDir,
    updateDir,
    deleteDir
}