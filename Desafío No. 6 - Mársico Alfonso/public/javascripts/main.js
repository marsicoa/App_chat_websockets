
let socket = io.connect(); 

socket.on('productos', function(productos) { 
    console.log(productos);
    //document.querySelector('p').innerHTML = db.map( prd => `SocketId: ${prd.socketid} -> Mensaje: ${prd.mensaje}`).join('<br>')
});

//const input = document.querySelector('input')
//document.querySelector('button').addEventListener('click', () => {
    //socket.emit('mensaje', input.value); 
//})