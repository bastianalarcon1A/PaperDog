# PaperDog - Artista Tatuador

## Descripción del Proyecto
Sitio web de una sola página (Landing Page) para PaperDog, artista tatuador ubicado en Concepción. Este proyecto presenta información del artista, muestra su portafolio de trabajos y permite a los clientes potenciales solicitar una reserva de horas de forma rápida, resolviendo el problema de pérdida de clientes por mensajes de Instagram.

**Estado:** Entrega Final (Semana 5 - 100%).
**Sitio publicado (GitHub Pages):** https://bastianalarcon1a.github.io/PaperDog/

## Requisitos y Funcionalidades Implementadas
* **Navegación (RF-01):** Barra de navegación fija con enlaces por ancla (`ScrollSpy`) y cierre automático del menú colapsable en dispositivos móviles.
* **Portafolio dinámico (RF-02):** Carga asíncrona desde `trabajos.json` con `fetch`, indicador de carga (*spinner*), manejo de errores y ventana modal para ampliar cada imagen con su descripción.
* **Reserva de hora y validación (RF-03 / RF-04):** Formulario con nombre, edad (mínimo 18 años), correo electrónico y tamaño del tatuaje, con validación visual de Bootstrap.
* **Confirmación y persistencia (RF-05):** Modal de confirmación al enviar la reserva y guardado en `localStorage` para recordar el nombre del cliente al recargar.
* **Contacto directo (RF-06):** Enlaces directos a WhatsApp y al Instagram oficial (`@paperdog_`).
* **Diseño responsivo y accesibilidad básica (RNF-01 / RNF-02):** Grillas de Bootstrap 5 adaptables a móvil y escritorio, etiquetas `<label>` asociadas a los campos y textos alternativos (`alt`) en imágenes.

## Tecnologías Utilizadas
* HTML5
* CSS3
* JavaScript (Vanilla JS, Manipulación del DOM, Fetch API, LocalStorage)
* Bootstrap 5.3.2 (CDN)
* JSON (`trabajos.json`)

## Estructura del Sitio
La página se organiza en secciones a las que se accede mediante anclas (scroll suave) desde la barra de navegación:

| Sección | ID | Descripción | Encargado(a) |
| :--- | :--- | :--- | :--- |
| Navegación | `#navbar` | Menú fijo con logo "PaperDog" y enlaces a todas las secciones. | Bastian Alarcón |
| Inicio | `#inicio` | Encabezado principal: "PaperDog - Artista Tatuador" e integración de Instagram. | Cristóbal Villalobos |
| Portafolio | `#portafolio` | Galería de trabajos del artista (carga dinámica con JSON y modal de ampliación). | Bastian Alarcón |
| Reserva | `#reserva` | Formulario con validación visual para agendar una hora y elegir tamaño. | Ivanna Villarroel |
| Contacto | `#contacto` | Footer con datos de contacto y redes sociales. | Cristóbal Villalobos |

## Cómo ejecutar el proyecto
Para revisar este proyecto en tu computador local, sigue estos sencillos pasos:

1. Clona este repositorio usando el comando:
   `git clone https://github.com/bastianalarcon1A/PaperDog.git`
   *(Alternativamente, puedes descargar el código haciendo clic en el botón verde "Code" > "Download ZIP" y descomprimiendo la carpeta).*
2. Debido a que `fetch()` solicita el archivo `trabajos.json`, abre la carpeta en tu editor y usa un servidor local (por ejemplo, **Live Server** en tu editor o `python -m http.server 8000` en la terminal) y entra a `http://localhost:8000`.
3. También puedes revisar el sitio directamente en línea en: `https://bastianalarcon1a.github.io/PaperDog/`.

## Equipo de Desarrollo (Equipo Angelina)
Proyecto desarrollado de forma colaborativa para la asignatura de Interfaz de Usuario:

* *Cristóbal Villalobos:* Líder / Coordinador (Estructura base HTML y Footer)
* *Ivanna Villarroel:* Frontend / Maquetación (Formulario y validaciones Bootstrap)
* *Bastian Alarcón:* Diseño UI/UX (Navegación, estilos, modal de galería y lógica JavaScript/Fetch/localStorage)
