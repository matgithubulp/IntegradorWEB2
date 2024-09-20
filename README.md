# IntegradorWEB2

##### **URGENTE**
- **problema:**
Error: listen EADDRINUSE: address already in use :::3000



############################## Problemas ACTUALES  ###########################################

## Estructura del Proyecto con Pug
- **Problema:** 
  tengo que utilizar un motor de plantilla(pug) y aun no se como se utiliza.(No se si sera necesario-Consultar)
- **Solución:** 
  Aun no hay solucion


## Paginacion
- **Descripcion:** 
- **Problema:** 
  La logica de la paginacion no funciona correctamente, me cambia de pagina luego de que se carguen los 20 elementos.
  
- **Solucion:** 
  Sin observaciones



## COsas que debo hacer
- **modularizar scrip.js y api.js**
- **uttilizar pug**
- **realizar algunas correcciones de codigo (leerlo nuevamente)**



------------------------------------------------------------------------------------------------------------------

---
# Registro de Problemas y Soluciones


## Error con `node-fetch` en CommonJS
- **Problema:** 
  Estaba usando `require('node-fetch')` en un archivo `CommonJS`, pero `node-fetch` es un modulo ES, así que no soporta `require()`. Me tiraba el error: `ERR_REQUIRE_ESM`, sin duda este error me freno mucho.
- **Solución:** 
  Tuve que cambiar la importacion a `import('node-fetch')` de manera dinamica. Ahora parece que funciona.

---

## Aviso de Deprecacion de `punycode`
- **Problema:** 
  Me aparecio un aviso de que `punycode` estaba deprecado. No entendia bien de donde venia eso ni que era.
- **Solucion:** 
   Segun investigue puede ser alguna dependencia que no esta actualizada.
   Decidi ignorarlo segun tengo entendido no me va a molestar.
---
# Registro de Problemas y Soluciones

## 1. Error 500 en la Consola
- **Descripcion:** 
  Al intentar acceder a ciertas rutas de la API, se produjo un error de servidor (500 Internal Server Error).
- **Problema:** 
  El error se debaa a un problema con la configuración de la API, en particular con la importacion dinamica de `node-fetch` y el uso de `node-google-translate-skidz` para la traducción.

- **Solucion:**
  - **API.js:**
    - La importacion dinamica estaba mal echa (No sabia como se hacia ni que era)
---

# Problemas y Soluciones

## Errores 404 y Endpoints Incorrectos

- **Problema:** 
  Recibias errores 404 al buscar datos, lo que indicaba que los endpoints no estaban funcionando correctamente.
  
- **Solucion:** 
  Se verificaron y ajustaron las rutas del servidor para asegurarse de que las URL de los endpoints estuvieran correctas y coincidan con las API del Met Museum.

---

## Duplicacion de Rutas

- **Problema:** 
  La ruta para buscar por palabra clave y localizacion y la ruta para buscar por departamento estaban definidas con el mismo path `/search`, lo que causaba conflictos me crasheaba la aplicacion 
  
- **Solucion:** 
 tuve que modificar las rutas para podeer diferenciarlas, asignando la ruta especifica para cada tipo de busqueda(palabra clave, localizacion y por departamento)

---

## Errores en el Lado del Cliente

- **Problema:** 
  El cliente no estaba recibiendo los datos correctamente debido a posibles errores en la construccion de URLs para las solicitudes y el manejo de datos.
  
- **Solucion:** 
 Y estaba en lo cierto, las URLs que se estaban creando no eran las correctas. Se soluciono gracias a un (`console.log`)
---




