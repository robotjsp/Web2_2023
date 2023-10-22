//Importamos la informacion del archivo "app.js"
const app = require('./app')
//Importamos la conexion local de la base datos
const {mongoconnection} = require('./database/datalink')
//Creamos una instancia del modulo dotenv
const dotenv = require('dotenv').config()
//Realizamos set o asignacion de puerto con una clave'port' y un puerto alternativo como parametro
app.set('port',process.env.PORT || 4000)
//Necesitamos definir el puerto de red de Internet 3000 o 8080 (permisos de Firewall) para iniciar el software
//Creamos un objeto que traiga la conexion a la bd
const conexion = mongoconnection();
//Definimos devolución de llamada y llamamos como parametro el objeto
app.listen(app.get('port'), ()=>{
console.log(`File Server| ✔️ Conexion Exitosa: 🛈 Internet port # ${app.get('port')}`);
});
//Si el servidor ejecuta esto, la conexión fue exitosa