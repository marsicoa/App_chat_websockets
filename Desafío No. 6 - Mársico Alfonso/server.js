const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const router = require("./routes/productos.js");

const mensajes = [];

app.set("view engine", "ejs");
app.set("views", "./views");

//Router API
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static(path.join(__dirname, "views")));

io.on("connection", (socket) => {

  /* Eventos conexion/desconexion */  
  console.log(`Conexión establecida - usuario: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Usuario ${socket.id} desconectado`);
  });

  /* Envio los mensajes al cliente que se conectó */
  socket.emit("mensajes", mensajes);

  /* Escucho los mensajes enviado por el cliente y se los propago a todos */
  socket.on("mensaje", (data) => {
    
    /* escribir un archivo para persistir los mensajes */

    mensajes.push({ email: data.email, fyh: data.fyh, mensaje: data.msj });
    io.sockets.emit("mensajes", mensajes);
  });
});

app.use("/", router);

//Server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
