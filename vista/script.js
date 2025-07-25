// Espera a que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".chat-input");
    const input = document.getElementById("pregunta");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que recargue la página

        const valorInput = input.value;
        console.log("Valor del input:", valorInput);
        // const valorInput = input.value;
        // console.log("Valor del input:", valorInput);

        // Enviar a la API
        fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pregunta: valorInput })
        })
            .then(res => res.json())
            .then(data => {
                console.log("Respuesta del servidor:", data);
                input.value = ""; // limpia el input después de enviar
            })
            .catch(err => {
                console.error("Error al enviar la pregunta:", err);
            });

    })
})