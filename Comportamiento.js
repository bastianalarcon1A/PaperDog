document.addEventListener("DOMContentLoaded", function () {

    // 1. Leer localStorage y actualizar el saludo al cargar o enviar
    function actualizarSaludo() {
        let nombreGuardado = localStorage.getItem("nombreCliente");
        let h1Inicio = document.getElementById("titulo-inicio") || document.querySelector("#inicio h1");
        if (nombreGuardado && h1Inicio) {
            h1Inicio.innerText = "¡Bienvenido de nuevo, " + nombreGuardado + "!";
        }
    }

    actualizarSaludo();

    // 2. Cargar portafolio con Fetch, distribución centrada y modal al hacer clic
    let galeria = document.getElementById("galeria-trabajos");
    if (galeria) {
        galeria.classList.add("row", "justify-content-center", "g-4");
        galeria.innerHTML = '<div class="text-center w-100 py-4"><div class="spinner-border text-light" role="status"><span class="visually-hidden">Cargando...</span></div></div>';

        fetch("trabajos.json?v=8")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al cargar trabajos.json");
                }
                return response.json();
            })
            .then(data => {
                galeria.innerHTML = "";
                data.forEach((trabajo, index) => {
                    let desc = trabajo.descripcion || trabajo.titulo;
                    let colClase = (data.length === 5 && index >= 3)
                        ? "col-12 col-sm-6 col-md-5 d-flex"
                        : "col-12 col-sm-6 col-md-4 d-flex";

                    let colDiv = document.createElement("div");
                    colDiv.className = colClase;

                    let cardDiv = document.createElement("div");
                    cardDiv.className = "card bg-dark text-white w-100 shadow-sm";
                    cardDiv.style.cursor = "pointer";

                    let img = document.createElement("img");
                    img.src = trabajo.imagen;
                    img.className = "card-img-top";
                    img.alt = trabajo.titulo;

                    let bodyDiv = document.createElement("div");
                    bodyDiv.className = "card-body";

                    let h5 = document.createElement("h5");
                    h5.className = "card-title text-white";
                    h5.innerText = trabajo.titulo;

                    let p = document.createElement("p");
                    p.className = "card-text small text-white fst-italic mb-0";
                    p.innerText = desc;

                    bodyDiv.appendChild(h5);
                    bodyDiv.appendChild(p);
                    cardDiv.appendChild(img);
                    cardDiv.appendChild(bodyDiv);
                    colDiv.appendChild(cardDiv);

                    cardDiv.addEventListener("click", function () {
                        abrirModalImagen(trabajo.titulo, trabajo.imagen, desc);
                    });

                    galeria.appendChild(colDiv);
                });
            })
            .catch(error => {
                console.error("Error cargando trabajos.json:", error);
                galeria.innerHTML = '<div class="alert alert-danger w-100 text-center" role="alert">No se pudieron cargar los trabajos. Por favor, intenta de nuevo más tarde.</div>';
            });
    }

    // 3. Validación del formulario, guardado en localStorage y modal de confirmación
    let formReserva = document.getElementById("formReserva");
    if (formReserva) {
        formReserva.addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopPropagation();

            let form = this;
            let inputEdad = document.getElementById("edad");
            let edad = inputEdad ? parseInt(inputEdad.value, 10) : NaN;

            if (!form.checkValidity() || isNaN(edad) || edad < 18) {
                form.classList.add("was-validated");
            } else {
                let inputNombre = document.getElementById("nombre");
                let selectTamano = document.getElementById("tamano");
                let nombre = inputNombre ? inputNombre.value.trim() : "";
                let tamano = selectTamano ? selectTamano.value : "";

                localStorage.setItem("nombreCliente", nombre);
                if (tamano) {
                    localStorage.setItem("tamanoTatuaje", tamano);
                }
                actualizarSaludo();

                let mensajeExito = document.getElementById("mensajeExito");
                if (mensajeExito) {
                    mensajeExito.innerText = tamano
                        ? "Gracias " + nombre + ", tu solicitud para un tatuaje " + tamano + " ha sido recibida."
                        : "Gracias " + nombre + ", tu solicitud de reserva ha sido recibida.";
                }

                let modalElement = document.getElementById("exitoModal");
                if (modalElement && typeof bootstrap !== "undefined") {
                    let modal = bootstrap.Modal.getOrCreateInstance(modalElement);
                    modal.show();
                }

                form.reset();
                form.classList.remove("was-validated");
            }
        }, false);
    }

    // 4. Cierre automático del menú en pantallas móviles al hacer clic en un enlace
    document.querySelectorAll(".navbar-nav .nav-link").forEach(enlace => {
        enlace.addEventListener("click", function () {
            const menu = document.getElementById("navbarNav");
            if (menu && menu.classList.contains("show") && typeof bootstrap !== "undefined") {
                const colapso = bootstrap.Collapse.getOrCreateInstance(menu);
                colapso.hide();
            }
        });
    });

});

// Función global para mostrar la imagen ampliada y su descripción en el modal
function abrirModalImagen(titulo, imagenSrc, descripcion) {
    let tituloEl = document.getElementById("modalImagenTitulo");
    let imgEl = document.getElementById("modalImagenSrc");
    let descEl = document.getElementById("modalImagenDesc");

    if (tituloEl) tituloEl.innerText = titulo;
    if (imgEl) {
        imgEl.src = imagenSrc;
        imgEl.alt = titulo;
    }
    if (descEl) descEl.innerText = descripcion;

    let modalImgElement = document.getElementById("modalImagen");
    if (modalImgElement && typeof bootstrap !== "undefined") {
        let modalImg = bootstrap.Modal.getOrCreateInstance(modalImgElement);
        modalImg.show();
    }
}
