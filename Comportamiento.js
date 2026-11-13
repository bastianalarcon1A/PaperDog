// Esperar a que todo el HTML cargue primero
document.addEventListener("DOMContentLoaded", function() {

    // 1. MEJORA C: Cargar datos con Fetch, Spinner y manejo de errores
    let galeria = document.getElementById('galeria-trabajos');
    if (galeria) {
        // Mostrar spinner de Bootstrap antes de iniciar la petición
        galeria.innerHTML = '<div class="text-center w-100 py-4"><div class="spinner-border text-secondary" role="status"><span class="visually-hidden">Cargando...</span></div></div>';

        fetch('trabajos.json')
            .then(response => {
                if (!response.ok) throw new Error('Error en la red');
                return response.json();
            })
            .then(data => {
                galeria.innerHTML = ''; // Limpiar el spinner
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

    // 2. MEJORA A: Validación, Envío Asíncrono (Formspree) y LocalStorage
    let formReserva = document.getElementById('formReserva');
    if (formReserva) {
        // Usamos una función asíncrona para no congelar la pantalla al enviar el correo
        formReserva.addEventListener('submit', async function (event) {
            event.preventDefault();
            event.stopPropagation();
            
            let form = this;
            let edad = document.getElementById('edad').value;

            // Validar campos obligatorios y edad
            if (!form.checkValidity() || edad < 18) {
                form.classList.add('was-validated');
            } else {
                let nombre = document.getElementById('nombre').value;
                let botonSubmit = form.querySelector('button[type="submit"]');
                let textoOriginal = botonSubmit.innerText;
                
                // UX: Cambiar botón a estado de carga mientras se envía el correo
                botonSubmit.innerText = "Enviando...";
                botonSubmit.disabled = true;

                try {
                    /* 
                    ============ INTEGRACIÓN CON FORMSPREE ============
                    Descomenta el bloque de abajo y pega tu código de Formspree 
                    para que el formulario envíe un correo de verdad.
                    */
                    
                    // const response = await fetch("https://formspree.io/f/TU_CODIGO_AQUI", {
                    //    method: "POST",
                    //    body: new FormData(form),
                    //    headers: { 'Accept': 'application/json' }
                    // });
                    // if (!response.ok) throw new Error("Fallo el envío");
                    
                    // Mostrar Modal de Bootstrap
                    document.getElementById('mensajeExito').innerText = "Gracias " + nombre + ", tu solicitud de reserva ha sido enviada con éxito.";
                    var modal = new bootstrap.Modal(document.getElementById('exitoModal'));
                    modal.show();
                    
                    // Guardar en localStorage
                    localStorage.setItem('nombreCliente', nombre);
                    actualizarSaludo(); 
                    
                    // Limpiar formulario[cite: 1]
                    form.reset();
                    form.classList.remove('was-validated');
                    
                } catch (error) {
                    alert("Lo sentimos, hubo un error al procesar tu reserva.");
                } finally {
                    // Restaurar el botón a su estado normal
                    botonSubmit.innerText = textoOriginal;
                    botonSubmit.disabled = false;
                }
            }
        }, false);
    }

    // 3. Función para usar localStorage y cambiar el título[cite: 1]
    function actualizarSaludo() {
        let nombreGuardado = localStorage.getItem('nombreCliente');
        
        // Enviar mensaje a la consola para verificar que se lee el nombre[cite: 1, 7]
        console.log("Nombre recuperado de localStorage:", nombreGuardado); 
        
        let h1Inicio = document.querySelector('#inicio h1');
        if (nombreGuardado && h1Inicio) {
            h1Inicio.innerText = "¡Bienvenido de nuevo, " + nombreGuardado + "!";
        }
    }

    // Ejecutar la función al cargar la página[cite: 1]
    actualizarSaludo();

    // 4. MEJORA B: Auto-cierre del Menú en Dispositivos Móviles
    document.querySelectorAll('.navbar-nav .nav-link').forEach(enlace => {
        enlace.addEventListener('click', () => {
            const menu = document.getElementById('navbarNav'); 
            if (menu && menu.classList.contains('show')) {
                const colapso = new bootstrap.Collapse(menu);
                colapso.toggle();
            }
        });
    });

});
