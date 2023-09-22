//Creamos un objeto de tipo Schema que importe el modulo(mongoose)
const { Schema, model } = require("mongoose");
//Creamos una Nueva instancia de Schema que reciba un objeto(con parametro) con los atributos
const ProductoraSchema = Schema({
    name: {
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
    slogan: {
        type: String,
        required: [true, 'Este campo es Obligatorio']
    },
    description: {
        type: String,
        required: [true, 'Este campo es Obligatorio']
    }
});
//Procedemos a exportar un modelo de tipo mongoose, se crea Alias 'typeDevice' y se llama desde el controller
module.exports = model('Productora', ProductoraSchema);