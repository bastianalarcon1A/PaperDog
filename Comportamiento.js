document.addEventListener("DOMContentLoaded", function() {

    // 1. Cargar datos del portafolio con Fetch, Spinner y manejo de errores
    let galeria = document.getElementById('galeria-trabajos');
    if (galeria) {
        galeria.innerHTML = '<div class="text-center w-100 py-4"><div class="spinner-border text-secondary" role="status"><span class="visually-hidden">Cargando...</span></div></div>';

        fetch('trabajos.json')
            .then(response => {
                if (!response.ok) throw new Error('Error en la red');
                return response.json();
            })
            .then(data => {
                galeria.innerHTML = '';
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
            .catch(error => {
                console.error('Error cargando los trabajos:', error);
                galeria.innerHTML = '<div class="alert alert-danger w-100 text-center" role="alert">No se pudieron cargar los trabajos. Por favor, intenta de nuevo más tarde.</div>';
            });
    }

    // 2. Validación del formulario, LocalStorage y Modal
    let formReserva = document.getElementById('formReserva');
    if (formReserva) {
        formReserva.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();
            
            let form = this;
            let edad = parseInt(document.getElementById('edad').value, 10);

            // Validar campos obligatorios y edad
            if (!form.checkValidity() || isNaN(edad) || edad < 18) {
                form.classList.add('was-validated');
            } else {
                let nombre = document.getElementById('nombre').value;

                // A. Guardar primero en localStorage y actualizar el saludo
                localStorage.setItem('nombreCliente', nombre);
                actualizarSaludo();

                // B. Mostrar alerta confirmando el guardado
                alert("¡Tus datos han sido guardados en el navegador correctamente!");

                // C. Mostrar Modal de Bootstrap
                let mensajeExito = document.getElementById('mensajeExito');
                if (mensajeExito) {
                    mensajeExito.innerText = "Gracias " + nombre + ", tu solicitud de reserva ha sido recibida.";
                }
                
                if (typeof bootstrap !== 'undefined') {
                    var modal = new bootstrap.Modal(document.getElementById('exitoModal'));
                    modal.show();
                }

                // D. Limpiar formulario
                form.reset();
                form.classList.remove('was-validated');
            }
        }, false);
    }

    // 3. Función para usar localStorage y cambiar el título
    function actualizarSaludo() {
        let nombreGuardado = localStorage.getItem('nombreCliente');
        console.log("Nombre recuperado de localStorage:", nombreGuardado); 
        
        let h1Inicio = document.querySelector('#inicio h1');
        if (nombreGuardado && h1Inicio) {
            h1Inicio.innerText = "¡Bienvenido de nuevo, " + nombreGuardado + "!";
        }
    }

    // Ejecutar la función al cargar la página
    actualizarSaludo();

    // 4. Auto-cierre del Menú en Dispositivos Móviles
    document.querySelectorAll('.navbar-nav .nav-link').forEach(enlace => {
        enlace.addEventListener('click', () => {
            const menu = document.getElementById('navbarNav'); 
            if (menu && menu.classList.contains('show') && typeof bootstrap !== 'undefined') {
                const colapso = new bootstrap.Collapse(menu);
                colapso.toggle();
            }
        });
    });

});
