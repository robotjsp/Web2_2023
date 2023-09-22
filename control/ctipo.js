//Importamos desde la carpeta models el tipo que corresponde al archivo
//Procedemos a poner el mismo nombre del Alias exportado desde el "models"
const TipoJSON = require('../model/tipo');
//Importa el tipo de dato
const { request, response } = require('express');

// Create (necesita recibir cuerpo) ------------------------------------
const createTipo = async (req = request, res = response) => {
    //console.log(req.body)
    // Creamos una condicion
    try {
        const name = (req.body.name) ? req.body.name.toString() : '';
        const description = (req.body.description) ? req.body.description.toString() : '';
        const TipoJSON_Query = await TipoJSON.findOne({name})
        if (TipoJSON_Query) {
            return res.status(400).json({ msg: 'File ctipo| ❌ Error: Nombre de director repetido. 🛈 Esta acción no modificará la DB' })
        }
        const data = {name,description}
        const JSON = new TipoJSON(data)
        console.log(JSON)
        await JSON.save()
        //Crear respuesta positiva #201
        res.status(201).json(JSON)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File ctipo| ❌ Error durante la solicitud para crear:', e })
    }
}
// Read by ID ------------------------------------------------------------
const getTipobyID = async (req = request, res = response) => {
    try {
        console.log(req.params)
        const id = req.params.id
        const query = { _id: id }
        const TipoJSON_QuerybyId = await TipoJSON.findOne(query)
        return res.json(TipoJSON_QuerybyId)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File ctipo| ❌ Error durante la lectura:',e })
    }
}

// Read All ------------------------------------------------------------
const getTipo = async (req = request, res = response) => {
    try {
        console.log(req.query)
        const status = req.query.status
        const query = { status: status }
        const TipoJSON_Query = await TipoJSON.find(query)
        return res.json(TipoJSON_Query)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File ctipo| ❌ Error durante la lectura:',e })
    }
}

// Update------------------------------------------------------------
const updateTipo = async (req = request, res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        const TipoJSONQuerybyId = await TipoJSON.findById(id)
        //if(!typeDeviceQuerybyId){
        //    return console.log('Este dispositivo no existe')
        //}
        data.updatedate = new Date()
        console.log(data)
        const TipoJSON_Query = await TipoJSON.findByIdAndUpdate(id, data, {new:true})
        return res.json(TipoJSON_Query)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: 'File ctipo| ❌ Error durante la actualizacion:',e})
    }
}

// Delete ------------------------------------------------------------
const deleteTipo = async (req = request, res = response) => {
    try {
        console.log(req.params)
        const id = req.params.id
        const TipoJSON_QuerybyId = await TipoJSON.findById(id)
        if (!TipoJSON_QuerybyId) {
            return res.status(404).json({ msg: 'File ctipo| 🛈 Este Id no existe en nuestra BD' })
        }
        await TipoJSON.findByIdAndDelete(id)
        return res.status(404).json({ msg: 'File ctipo| ✔️ Elemento eliminado con exito' })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File ctipo| ❌ Error durante la solicitud para eliminar:', e })
    }
}
module.exports = {
    createTipo,
    getTipobyID,
    getTipo,
    updateTipo,
    deleteTipo
}