//Creamos un objeto de tipo Schema que importe el modulo(mongoose)
const { Schema, model } = require("mongoose");
//Creamos una Nueva instancia de Schema que reciba un objeto(con parametro) con los atributos
const mediaSchema = Schema({
    serial: {
        type: String,
        required: [true, 'Este dato es Obligatorio']
    },
    titulo: {
        type: String
    },
    sinopsis: {
        type: String
    },
    urlfilm: {
        type: String
    },
    portada: {
        type: String
    },
    createdate: {
        type: Date,
        default: new Date()
    },
    update: {
        type: Date,
        default: new Date()
    },
    dateposting: {
        type: Date
    },
    genero:{
        type: Schema.Types.ObjectId,
        ref:'Genero'
    },
    director:{
        type: Schema.Types.ObjectId,
        ref:'Director'
    },
    productora:{
        type: Schema.Types.ObjectId,
        ref:'Productora'
    },
    tipo:{
        type: Schema.Types.ObjectId,
        ref:'Tipo'
    }
});
//Procedemos a exportar un modelo de tipo mongoose, se crea Alias 'typeDevice' y se llama desde el controller
module.exports = model('media', mediaSchema);