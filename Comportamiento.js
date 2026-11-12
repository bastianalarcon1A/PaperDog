// 1. Cargar datos del portafolio con Fetch
fetch('trabajos.json')
    .then(response => response.json())
    .then(data => {
        let galeria = document.getElementById('galeria-trabajos');
        data.forEach(trabajo => {
            galeria.innerHTML += `
                <div class="col-sm-12 col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="${trabajo.imagen}" class="card-img-top" alt="${trabajo.titulo}">
                        <div class="card-body">
                            <h5 class="card-title">${trabajo.titulo}</h5>
                        </div>
                    </div>
                </div>
            `;
        });
    })
    .catch(error => console.error('Error cargando los trabajos:', error));

// 2. Validación del formulario y Modal
document.getElementById('formReserva').addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    let form = this;
    let edad = document.getElementById('edad').value;

    // Validar campos obligatorios y edad
    if (!form.checkValidity() || edad < 18) {
        form.classList.add('was-validated');
    } else {
        // Mostrar Modal si es válido
        let nombre = document.getElementById('nombre').value;
        document.getElementById('mensajeExito').innerText = "Gracias " + nombre + ", tu solicitud de reserva ha sido recibida.";
        
        var modal = new bootstrap.Modal(document.getElementById('exitoModal'));
        modal.show();
        
        // --- NUEVO: Guardar en localStorage ---
        localStorage.setItem('nombreCliente', nombre);
        // Actualizamos el saludo inmediatamente
        actualizarSaludo(); 
        
        // Limpiar formulario
        form.reset();
        form.classList.remove('was-validated');
    }
}, false);

// --- NUEVO: Función para usar localStorage ---
function actualizarSaludo() {
    let nombreGuardado = localStorage.getItem('nombreCliente');
    let h1Inicio = document.querySelector('#inicio h1');
    
    if (nombreGuardado) {
        // Si hay un nombre guardado, cambiamos el título principal
        h1Inicio.innerText = "¡Bienvenido de nuevo, " + nombreGuardado + "!";
    }
}

// Ejecutar la función al cargar la página por si ya había un nombre guardado
actualizarSaludo();
