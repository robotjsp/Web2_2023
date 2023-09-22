//Creamos un objeto de tipo Schema que importe el modulo(mongoose)
const { Schema, model } = require("mongoose");
//Creamos una Nueva instancia de Schema que reciba un objeto(con parametro) con los atributos
const generoSchema = Schema({
    Name: {
        type: String,
        required: [true, 'Este dato es Obligatorio']
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    createdate: {
        type: Date,
        default: new Date()
    },
    update: {
        type: Date,
        default: new Date()
    },
    description: {
        type: String,
        required: [true, 'Este dato es Obligatorio']
    }
});
//Procedemos a exportar un modelo de tipo mongoose, se crea Alias 'typeDevice' y se llama desde el controller
module.exports = model('Genero', generoSchema);