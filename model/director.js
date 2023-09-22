//Creamos un objeto de tipo Schema que importe el modulo(mongoose)
const { Schema, model } = require("mongoose");
//Creamos una Nueva instancia de Schema que reciba un objeto(con parametro) con los atributos
const DirectorSchema = Schema({
    name: {
        type: String,
        required: [true, '🛈 Recuerda: Este campo es obligatorio']
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
    }
});
//Procedemos a exportar un modelo de tipo mongoose, se crea Alias 'directorSchema' y se llama desde el controller
module.exports = model('Director', DirectorSchema);