document.addEventListener("DOMContentLoaded", function() {

    // 1. Función para leer localStorage y mostrar el saludo al cargar o enviar
    function actualizarSaludo() {
        let nombreGuardado = localStorage.getItem('nombreCliente');
        let h1Inicio = document.getElementById('titulo-inicio') || document.querySelector('#inicio h1');
        if (nombreGuardado && h1Inicio) {
            h1Inicio.innerText = "¡Bienvenido de nuevo, " + nombreGuardado + "!";
        }
    }

    actualizarSaludo();

    // 2. Cargar datos del portafolio con Fetch, Spinner, distribución centrada y ampliación
    let galeria = document.getElementById('galeria-trabajos');
    if (galeria) {
        galeria.classList.add('justify-content-center');
        galeria.innerHTML = '<div class="text-center w-100 py-4"><div class="spinner-border text-secondary" role="status"><span class="visually-hidden">Cargando...</span></div></div>';

        fetch('trabajos.json?v=4')
            .then(response => {
                if (!response.ok) throw new Error('Error en la red');
                return response.json();
            })
            .then(data => {
                galeria.innerHTML = '';
                data.forEach((trabajo, index) => {
                    let desc = trabajo.descripcion || trabajo.titulo;
                    // 3 tarjetas arriba (col-md-4) y 2 tarjetas abajo centradas (col-md-5) cuando son 5
                    let colClase = (data.length === 5 && index >= 3) ? 'col-sm-12 col-md-5' : 'col-sm-12 col-md-4';

                    galeria.innerHTML += `
                        <div class="${colClase} mb-4 d-flex">
                            <div class="card bg-dark text-white h-100 w-100 shadow-sm text-center" style="cursor: pointer;" onclick="abrirModalImagen('${trabajo.titulo}', '${trabajo.imagen}', '${desc}')">
                                <img src="${trabajo.imagen}" class="card-img-top" alt="${trabajo.titulo}">
                                <div class="card-body d-flex flex-column justify-content-center">
                                    <h5 class="card-title text-white">${trabajo.titulo}</h5>
                                    <p class="card-text small text-white fst-italic mb-0">${desc}</p>
                                </div>
                            </div>
                        </div>
                    `;
                });
            })
            .catch(error => {
                console.error('Error cargando trabajos.json:', error);
                galeria.innerHTML = '<div class="alert alert-danger w-100 text-center" role="alert">No se pudieron cargar los trabajos. Por favor, intenta de nuevo más tarde.</div>';
            });
    }

    // 3. Validación del formulario, guardado en localStorage y Modal directo
    let formReserva = document.getElementById('formReserva');
    if (formReserva) {
        formReserva.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();

            let form = this;
            let edad = parseInt(document.getElementById('edad').value, 10);

            if (!form.checkValidity() || isNaN(edad) || edad < 18) {
                form.classList.add('was-validated');
            } else {
                let nombre = document.getElementById('nombre').value.trim();
                let tamano = document.getElementById('tamano').value;

                localStorage.setItem('nombreCliente', nombre);
                localStorage.setItem('tamanoTatuaje', tamano);
                actualizarSaludo();

                let mensajeExito = document.getElementById('mensajeExito');
                if (mensajeExito) {
                    mensajeExito.innerText = "Gracias " + nombre + ", tu solicitud para un tatuaje " + tamano + " ha sido recibida.";
                }

                let modalElement = document.getElementById('exitoModal');
                if (modalElement && typeof bootstrap !== 'undefined') {
                    let modal = bootstrap.Modal.getOrCreateInstance(modalElement);
                    modal.show();
                }

                form.reset();
                form.classList.remove('was-validated');
            }
        }, false);
    }

    // 4. Auto-cierre del Menú en Dispositivos Móviles
    document.querySelectorAll('.navbar-nav .nav-link').forEach(enlace => {
        enlace.addEventListener('click', () => {
            const menu = document.getElementById('navbarNav');
            if (menu && menu.classList.contains('show') && typeof bootstrap !== 'undefined') {
                const colapso = bootstrap.Collapse.getOrCreateInstance(menu);
                colapso.hide();
            }
        });
    });

});

// Función global para abrir la imagen ampliada en el Modal
function abrirModalImagen(titulo, imagenSrc, descripcion) {
    document.getElementById('modalImagenTitulo').innerText = titulo;
    document.getElementById('modalImagenSrc').src = imagenSrc;
    document.getElementById('modalImagenSrc').alt = titulo;
    document.getElementById('modalImagenDesc').innerText = descripcion;

    let modalImgElement = document.getElementById('modalImagen');
    if (modalImgElement && typeof bootstrap !== 'undefined') {
        let modalImg = bootstrap.Modal.getOrCreateInstance(modalImgElement);
        modalImg.show();
    }
}
