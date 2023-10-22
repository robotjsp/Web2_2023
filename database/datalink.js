//Importamos modulo Mongoose en objeto mongoose
const mongoose = require('mongoose');

//Creamos un metodo de conexion de tipo asincronico(async)
const mongoconnection = async () => {
    //Utilizamos un try catch para atrapar algun error de conexion
    try{
    //Modulo mongoose, metodo connect y con process, llamamos el URI de (.env)
    //Anteponemos await para recibir una promesa si el metodo es async
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    console.log('File Datalink| ✅ Base de Datos en linea ⚙️...')
    }catch(e){
        console.log('Datalink reply| ❎ Error: Falló la conexion debido a: ', e);
        //Crear un nuevo error
        throw new Error('New Issue about : ❎ Error de conexion');
    }
};

//Utilizamos modulo y metodo exportar e ingresamos el metodo creado "mongoconnection"
module.exports = { mongoconnection };