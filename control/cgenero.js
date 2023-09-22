//Importamos desde la carpeta models el tipo que corresponde al archivo
//Procedemos a poner el mismo nombre del Alias exportado desde el "models"
const generoJSON = require('../model/genero');
//Importa el tipo de dato
const { request, response } = require('express');

// Create (necesita recibir cuerpo) ------------------------------------
const createGen = async (req = request, res = response) => {
    //console.log(req.body)
    // Creamos una condicion
    try {
        const name = (req.body.name) ? req.body.name.toString() : '';
        const description = (req.body.description) ? req.body.description.toString() : '';
        const generoJSON_Query = await generoJSON.findOne({name})
        if (generoJSON_Query) {
            return res.status(400).json({ msg: 'File cgenero| ❌ Error: Nombre de director repetido. 🛈 Esta acción no modificará la DB' })
        }
        const data = {name,description}
        const JSON = new generoJSON(data)
        console.log(JSON)
        await JSON.save()
        //Crear respuesta positiva #201
        res.status(201).json(JSON)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cgenero| ❌ Error durante la solicitud para crear:', e })
    }
}
// Read by ID ------------------------------------------------------------
const getGenbyID = async (req = request, res = response) => {
    try {
        console.log(req.params)
        const id = req.params.id
        const query = { _id: id }
        const generoJSON_QuerybyId = await generoJSON.findOne(query)
        return res.json(generoJSON_QuerybyId)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cgenero| ❌ Error durante la lectura:',e })
    }
}

// Read All ------------------------------------------------------------
const getGen = async (req = request, res = response) => {
    try {
        console.log(req.query)
        const status = req.query.status
        const query = { status: status }
        const generoJSON_Query = await generoJSON.find(query)
        return res.json(generoJSON_Query)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cgenero| ❌ Error durante la lectura:',e })
    }
}

// Update------------------------------------------------------------
const updateGen = async (req = request, res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        const generoJSONQuerybyId = await generoJSON.findById(id)
        //if(!typeDeviceQuerybyId){
        //    return console.log('Este dispositivo no existe')
        //}
        data.updatedate = new Date()
        console.log(data)
        const generoJSON_Query = await generoJSON.findByIdAndUpdate(id, data, {new:true})
        return res.json(generoJSON_Query)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: 'File cgenero| ❌ Error durante la actualizacion:',e})
    }
}

// Delete ------------------------------------------------------------
const deleteGen = async (req = request, res = response) => {
    try {
        console.log(req.params)
        const id = req.params.id
        const generoJSON_QuerybyId = await generoJSON.findById(id)
        if (!generoJSON_QuerybyId) {
            return res.status(404).json({ msg: 'File cgenero| 🛈 Este Id no existe en nuestra BD' })
        }
        await generoJSON.findByIdAndDelete(id)
        return res.status(404).json({ msg: 'File cgenero| ✔️ Elemento eliminado con exito' })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cgenero| ❌ Error durante la solicitud para eliminar:', e })
    }
}
module.exports = {
    createGen,
    getGenbyID,
    getGen,
    updateGen,
    deleteGen
}