# IntegradorWEB2


############ Problemas ACTUALES  ###################

## Estructura del Proyecto con Pug
- **Problema:** 
  tengo que utilizar un motor de plantilla(pug) y aun no se como se utiliza.(No se si sera necesario)
- **Solucion:** 
  Aun no hay solucion


## Paginacion
- **Descripcion:** 
- **Problema:** 
  La logica de la paginacion no funciona correctamente, me cambia de pagina luego de que se carguen los 20 elementos.



------------------------------------------------------------------------------------------------------------------

---
# Registro de Problemas y Soluciones



## Aviso de Deprecacion de `punycode`
- **Problema:** 
  Me aparecio un aviso de que `punycode` estaba deprecado. No entendia bien de donde venia eso ni que era.
- **Solucion:** 
   Segun investigue puede ser alguna dependencia que no esta actualizada.
   Decidi ignorarlo segun tengo entendido no me va a molestar.
---



## Errores 404 

- **Problema:** 
  Recibias errores 404 al buscar datos, lo que indicaba que los endpoints no estaban funcionando correctamente
  
- **Solucion:** 
  Se verificaron y ajustaron las rutas del servidor para asegurarse de que las URL de los endpoints estuvieran correctas y coincidan con las API

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




