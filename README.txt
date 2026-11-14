TPLM - Trabajo Práctico de Laboratorio de Aplicaciones Web Cliente

Puesta en marcha antes de las clases
- Instalación de Visual Studio Code.
- Uso de Live Server para abrir el proyecto localmente.
- Actualización del repositorio en Git y GitHub.
-https://github.com/luismorel-alt/TPLM

API https://fakestoreapi.com/products

Clase 1 - Uso de JavaScript en el proyecto (16/10)
Introducción a JavaScript para el curso de Laboratorio de Aplicaciones Web Cliente. En el proyecto se trabaja con módulos JavaScript, funciones, consumo de productos y creación de contenido en el DOM.
Video: https://youtu.be/85bLGBHbWKw

Clase 2 - Crear modal + LocalStorage (23/10)
- Creación y uso de una plantilla de modal desde JavaScript.
- Modal con imagen, descripción, precio U$S, contador de cantidad y botones para cerrar o agregar al carrito.
- Barra de búsqueda debajo del título Productos.
- Uso de Google Fonts: Titillium Web.
- Introducción a LocalStorage con el ejemplo de clase en storage.js. La lógica del carrito se desarrollará en la clase siguiente.
- Referencia a páginas de diseño web.
Video: https://youtu.be/wL0jqAxGb9E

Fuentes y herramientas utilizadas
- Bootstrap Modal: https://getbootstrap.com/docs/5.3/components/modal/
- Tema de referencia: https://themes.getbootstrap.com/preview/theme_id=60676
- Google Fonts: https://fonts.google.com/
- Fake Store API: https://fakestoreapi.com/

Estructura actual
TPLM
├── index.html
├── README.txt
└── src
    ├── components
    │   ├── cards.js
    │   ├── modal.js
    │   └── storage.js
    ├── css
    │   └── styles.css
    ├── api.js
    └── index.js


30/10
Clase 3: 
https://youtu.be/9mtcWAMG3KY

Uso de Localstorage en el proyecto. 
Guardando productos seleccionados a localstarorage.
Actualizando cantidades de productos en localstorage.

TPLM
└── src
    ├── components
    │   ├── cards.js
    │   └── modal.js
    ├── css
    │   └── styles.css
    ├── services
    │   └── api.js
    ├── storage
    │   └── storage.js
    ├── index.js
    └── index.html

README.txt

06/11
Clase 4: Completando Carrito de Compras y filtros de búsquedas.
clase 4 link: https://youtu.be/0poxcLLY4Eo

Se completa la logica y UI del carrito de compras. 
Se agrega el input search. 
Se agrega notificaciones mejorar la UX
Se agrega categorías y se filtra por cada una de ellas. 
Se muestra el usos de Lighthouse desde la devtools, analizando la pag desde el enfoque de accesibilidad web.

TPLM
├── .vscode
├── src
│   ├── components
│   │   ├── cards.js
│   │   ├── contador.js
│   │   └── modal.js
│   ├── css
│   │   └── styles.css
│   ├── services
│   │   └── api.js
│   ├── storage
│   │   └── storage.js
│   └── index.js
├── index.html
└── README.txt

https://theretailexec.com/es/gestion-de-plataforma/pagina-carrito-compras/


13/11
Clase 5: Formulario
https://youtu.be/2iVvmhWHP5U
Trabajar con distintos tipos de inputs: 

Carga de archivos / imágenes (input type="file") 
Datos de texto (Nombre, Apellido, Dirección y Código Postal) 
Menús desplegables (input select) 
Casillas de verificación (checkbox)

TPLM
│
├── .vscode
│
├── src
│   │
│   ├── components
│   │   ├── cards.js
│   │   ├── cart.js
│   │   ├── contador.js
│   │   └── modal.js
│   │
│   ├── css
│   │   └── styles.css
│   │
│   ├── services
│   │   └── api.js
│   │
│   ├── storage
│   │   └── storage.js
│   │
│   └── index.js
│
└── index.html

20/11 Entrega del Tp
27/11 Recuperatorio
