//Importamos desde la carpeta models el tipo que corresponde al archivo
//Procedemos a poner el mismo nombre del Alias exportado desde el "models"
const mediaJSON = require('../model/media');
//Importa el tipo de dato
const { request, response } = require('express');

// Create (necesita recibir cuerpo) ------------------------------------
const CreateMedia = async (req = request, res = response) => {
    console.log(req.body)
    
    //New method
    const {serial, titulo, sinopsis, urlfilm, portada,dateposting,genero,director,productora,tipo} = req.body;
    // Creamos una condicion
    try {
        //Old Method
        //const serial = (req.body.serial) ? req.body.serial.toString() : '';
        //const titulo = (req.body.titulo) ? req.body.titulo.toString() : '';
        //const sinopsis = (req.body.sinopsis) ? req.body.sinopsis.toString() : '';
        //const urlfilm = (req.body.urlfilm) ? req.body.urlfilm.toString() : '';
        //const portada = (req.body.portada) ? req.body.portada.toString() : '';
        //const dateposting = (req.body.dateposting) ? req.body.dateposting.toString() : '';
        //const genero = req.body.genero._id;
        //const director = req.body.director._id;
        //const productora = req.body.productora._id;
        //const tipo = req.body.tipo._id;

        const mediaJSON_Query = await mediaJSON.findOne({serial})
        // Validamos los datos
        if (mediaJSON_Query) {
            return res.status(400).json({ msg: 'File cmedia| ❌ Error: Nombre de director repetido. 🛈 Esta acción no modificará la DB' })
        }

        // Creamos el objeto con los datos de la media
        const data = {serial,titulo,sinopsis,urlfilm,portada,dateposting,genero,director,productora,tipo};

        // Creamos el nuevo documento en la base de datos
        const JSON = new mediaJSON(data);
        console.log(JSON);
        await JSON.save();

        // Crear respuesta positiva #201
        res.status(201).json(JSON);
    } catch (e) {
        console.log(error);
        return res.status(500).json({ msg: 'File cmedia| ❌ Error durante la solicitud para crear:', error });
    }
};
// Read by ID ------------------------------------------------------------
const GetMediabyID = async (req = request, res = response) => {
    try {
        console.log(req.params)
        const id = req.params.id
        const query = { _id: id }
        const mediaJSON_QuerybyId = await mediaJSON.findOne(query)
        return res.json(mediaJSON_QuerybyId)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cmedia| ❌ Error durante la lectura:', e })
    }
}

// Read All ------------------------------------------------------------
const GetMedia = async (req = request, res = response) => {
    try {
        console.log(req.query)
        const status = req.query.status
        const query = { status: status }
        const mediaJSON_Query = await mediaJSON.find(query)
        return res.json(mediaJSON_Query)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cmedia| ❌ Error durante la lectura:', e })
    }
}

// Update------------------------------------------------------------
const UpdateMedia = async (req = request, res = response) => {
    try {
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        const mediaJSONQuerybyId = await mediaJSON.findById(id)
        //if(!typeDeviceQuerybyId){
        //    return console.log('Este dispositivo no existe')
        //}
        data.updatedate = new Date()
        console.log(data)
        const mediaJSON_Query = await mediaJSON.findByIdAndUpdate(id, data, { new: true })
        return res.json(mediaJSON_Query)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cmedia| ❌ Error durante la actualizacion:', e })
    }
}

// Delete ------------------------------------------------------------
const DeleteMedia = async (req = request, res = response) => {
    try {
        console.log(req.params)
        const id = req.params.id
        const mediaJSON_QuerybyId = await mediaJSON.findById(id)
        if (!mediaJSON_QuerybyId) {
            return res.status(404).json({ msg: 'File cmedia| 🛈 Este Id no existe en nuestra BD' })
        }
        await mediaJSON.findByIdAndDelete(id)
        return res.status(404).json({ msg: 'File cmedia| ✔️ Elemento eliminado con exito' })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: 'File cmedia| ❌ Error durante la solicitud para eliminar:', e })
    }
}
module.exports = {
    CreateMedia,
    GetMediabyID,
    GetMedia,
    UpdateMedia,
    DeleteMedia
}