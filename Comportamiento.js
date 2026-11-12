// Esperar a que todo el HTML cargue primero
document.addEventListener("DOMContentLoaded", function() {

    // 1. Cargar datos del portafolio con Fetch
    fetch('trabajos.json')
        .then(response => response.json())
        .then(data => {
            let galeria = document.getElementById('galeria-trabajos');
            if (galeria) {
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
            }
        })
        .catch(error => console.error('Error cargando los trabajos:', error));

    // 2. Validación del formulario, Modal y LocalStorage
    let formReserva = document.getElementById('formReserva');
    if (formReserva) {
        formReserva.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();
            
            let form = this;
            let edad = document.getElementById('edad').value;

            // Validar campos obligatorios y edad
            if (!form.checkValidity() || edad < 18) {
                form.classList.add('was-validated');
            } else {
                // Mostrar Modal de Bootstrap
                let nombre = document.getElementById('nombre').value;
                document.getElementById('mensajeExito').innerText = "Gracias " + nombre + ", tu solicitud de reserva ha sido recibida.";
                
                var modal = new bootstrap.Modal(document.getElementById('exitoModal'));
                modal.show();
                
                // Guardar en localStorage
                localStorage.setItem('nombreCliente', nombre);
                
                // Mostrar alerta visual encima del navegador confirmando el guardado
                alert("¡Tus datos han sido guardados en el navegador correctamente!"); 
                
                // Actualizar título inmediatamente
                actualizarSaludo(); 
                
                // Limpiar formulario
                form.reset();
                form.classList.remove('was-validated');
            }
        }, false);
    }

    // 3. Función para usar localStorage y cambiar el título
    function actualizarSaludo() {
        let nombreGuardado = localStorage.getItem('nombreCliente');
        
        // Enviar mensaje a la consola para verificar que se lee el nombre[cite: 7]
        console.log("Nombre recuperado de localStorage:", nombreGuardado); 
        
        let h1Inicio = document.querySelector('#inicio h1');
        
        if (nombreGuardado && h1Inicio) {
            h1Inicio.innerText = "¡Bienvenido de nuevo, " + nombreGuardado + "!";
        }
    }

    // Ejecutar la función al cargar la página
    actualizarSaludo();
});
