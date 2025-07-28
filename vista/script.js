document.addEventListener("DOMContentLoaded", () => {
    const formularioChat = document.getElementById("chatForm");
    const campoMensaje = document.getElementById("pregunta");
    const contenedorChat = document.getElementById("chatBox");

    function agregarMensaje(textoMensaje, remitente) {
        const divMensaje = document.createElement("div");
        divMensaje.classList.add(`${remitente}-message`);

        if (remitente === "bot") {
            divMensaje.innerHTML = `<i class='bx bx-bot'></i><p>${textoMensaje}</p>`;
        } else { 
            divMensaje.innerHTML = `<p>${textoMensaje}</p><i class='bx bx-user-circle'></i>`;
        }
        contenedorChat.appendChild(divMensaje);
        contenedorChat.scrollTop = contenedorChat.scrollHeight;
    }

    // Esta función muestra u oculta un mensaje de "El bot está escribiendo..."
    function alternarIndicadorEscribiendo(mostrar) {
        const idIndicadorEscribiendo = "bot-typing-indicator";
        let divEscribiendo = document.getElementById(idIndicadorEscribiendo);

        if (mostrar) {
            if (!divEscribiendo) {
                divEscribiendo = document.createElement("div");
                divEscribiendo.id = idIndicadorEscribiendo;
                divEscribiendo.classList.add("bot-message"); 
                divEscribiendo.innerHTML = `<i class='bx bx-bot'></i><p>Escribiendo...</p>`;
                contenedorChat.appendChild(divEscribiendo);
                contenedorChat.scrollTop = contenedorChat.scrollHeight; 
            }
        } else {
            if (divEscribiendo) {
                divEscribiendo.remove();
            }
        }
    }

    setTimeout(() => {
        agregarMensaje("¡Hola! Soy tu asistente. ¿En qué error necesitas ayuda hoy?", "bot");
    }, 1000); 

    formularioChat.addEventListener("submit", (evento) => {  
        evento.preventDefault(); 

        const valorMensaje = campoMensaje.value.trim();
        if (!valorMensaje) {
            return;  
        }

        agregarMensaje(valorMensaje, "user");

        console.log(" mensaje de  envio:", valorMensaje);
 
        campoMensaje.value = ""; 
        campoMensaje.disabled = true;
        formularioChat.querySelector("button[type='submit']").disabled = true;
        alternarIndicadorEscribiendo(true);  
 
        fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pregunta: valorMensaje })
        })
        .then(respuestaFetch => {
            if (!respuestaFetch.ok) {
                return respuestaFetch.text().then(textoError => {
                    throw new Error(`Error HTTP: ${respuestaFetch.status} - ${respuestaFetch.statusText}. Detalles: ${textoError}`);
                });
            }
            return respuestaFetch.json();
        })
        .then(datosRespuesta => {
            console.log("Respuesta del servidor:", datosRespuesta);
            const respuestaBot = datosRespuesta.respuesta || "Lo siento, no pude obtener una respuesta clara del asistente.";
            agregarMensaje(respuestaBot, "bot");
        })
        .catch(error => {
            console.error("Error al enviar la pregunta o procesar la respuesta:", error);
            agregarMensaje("Lo siento, hubo un error al conectar con el asistente. Por favor, inténtalo de nuevo más tarde.", "bot");
        })
        .finally(() => {
            campoMensaje.disabled = false;
            formularioChat.querySelector("button[type='submit']").disabled = false;
            alternarIndicadorEscribiendo(false);  
            campoMensaje.focus(); 
        });
    });
});
