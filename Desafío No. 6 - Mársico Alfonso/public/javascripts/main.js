let socket = io.connect();

socket.on("mensajes", function (msj) {
  //console.log(msj);
  document.getElementById("items").innerHTML = msj
    .map((msj) => `<span style="color:blue"><b>${msj.email}</b></span> <span style="color:brown">[ ${msj.fyh}]</span>: <span style="font-family:italic; color:green">${msj.mensaje}</span>`)
    .join("<br>");
});

const input = document.getElementById("chat-input");
const email = document.getElementById("chat-email")
document.getElementById("chat-btn").addEventListener("click", () => {
    const fyh = new Date().toLocaleString()
    email.value ? socket.emit("mensaje", {msj: input.value, email: email.value, fyh: fyh}) : alert("Debe ingresar su email")
});

/* socket.on("connection", () => {
  const recuperarTabla = async () => {
    try {
      const res = await fetch("http://localhost:8080/partials/tabla.ejs", {
        method: "GET",
      });
      //const data = await res.json()
      //console.log(data)
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  let response = recuperarTabla().then((data) => data);
  console.log(response);
  return response;
});
 */
