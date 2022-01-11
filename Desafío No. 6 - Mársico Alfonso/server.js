const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const router = require('./routes/productos.js')

const PORT = 8080
const mensajes = []
  
app.set("view engine", "ejs");
app.set("views", "./views");

//Router API
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!');
    
    /* Envio los mensajes al cliente que se conectó */
    socket.emit('mensajes', mensajes);
    
    /* Escucho los mensajes enviado por el cliente y se los propago a todos */
    socket.on('mensaje', data => {
        mensajes.push({socketid: socket.id, mensaje: data})
        io.sockets.emit('mensajes', mensajes); 
    });  
});

app.use('/', router)

//Server
const srv = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${srv.address().port}`)
})
srv.on('error', error => console.log(`Error en servidor ${error}`))

