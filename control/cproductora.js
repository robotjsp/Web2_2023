//Importamos desde la carpeta models el tipo que corresponde al archivo
//Procedemos a poner el mismo nombre del Alias exportado desde el "models"
const productoraJSON = require('../model/productora');
//Importa el tipo de dato
const { request, response } = require('express');

// Create (necesita recibir cuerpo) ------------------------------------
const createPro = async (req = request, res = response) => {
    //console.log(req.body)
    // Creamos una condicion
    try {
        const name = (req.body.name) ? req.body.name.toString() : '';
        const slogan = (req.body.slogan) ? req.body.slogan.toString() : '';
        const description = (req.body.description) ? req.body.description.toString() : '';
        const productoraJSON_Query = await productoraJSON.findOne({name})
        if (productoraJSON_Query) {
            return res.status(400).json({ msg: 'File cproductora| ❌ Error: Nombre de director repetido. 🛈 Esta acción no modificará la DB' })
        }
        const data = {name,slogan,description}
        const JSON = new productoraJSON(data)
        console.log(JSON)
        await JSON.save()
        //Crear respuesta positiva #201
        res.status(201).json(JSON)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cproductora| ❌ Error durante la solicitud para crear:', e })
    }
}
// Read by ID ------------------------------------------------------------
const getProbyID = async (req = request, res = response) => {
    try {
        console.log(req.params)
        const id = req.params.id
        const query = { _id: id }
        const productoraJSON_QuerybyId = await productoraJSON.findOne(query)
        return res.json(productoraJSON_QuerybyId)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cproductora| ❌ Error durante la lectura:',e })
    }
}

// Read All ------------------------------------------------------------
const getPro = async (req = request, res = response) => {
    try {
        console.log(req.query)
        const status = req.query.status
        const query = { status: status }
        const productoraJSON_Query = await productoraJSON.find(query)
        return res.json(productoraJSON_Query)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cproductora| ❌ Error durante la lectura:',e })
    }
}

// Update------------------------------------------------------------
const updatePro = async (req = request, res = response) => {
    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        const productoraJSONQuerybyId = await productoraJSON.findById(id)
        //if(!typeDeviceQuerybyId){
        //    return console.log('Este dispositivo no existe')
        //}
        data.updatedate = new Date()
        console.log(data)
        const productoraJSON_Query = await productoraJSON.findByIdAndUpdate(id, data, {new:true})
        return res.json(productoraJSON_Query)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: 'File cproductora| ❌ Error durante la actualizacion:',e})
    }
}

// Delete ------------------------------------------------------------
const deletePro = async (req = request, res = response) => {
    try {
        console.log(req.params)
        const id = req.params.id
        const productoraJSON_QuerybyId = await productoraJSON.findById(id)
        if (!productoraJSON_QuerybyId) {
            return res.status(404).json({ msg: 'File cproductora| 🛈 Este Id no existe en nuestra BD' })
        }
        await productoraJSON.findByIdAndDelete(id)
        return res.status(404).json({ msg: 'File cproductora| ✔️ Elemento eliminado con exito' })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cproductora| ❌ Error durante la solicitud para eliminar:', e })
    }
}
module.exports = {
    createPro,
    getProbyID,
    getPro,
    updatePro,
    deletePro
}