
=======
# IntegradorWEB2

## Funcionamiento:
  - Las palabrass claves deben ser ingresadas en ingles al igual que las lozalizaciones,
  - Las localizaciones deben de empezar en mayusculas seria valido Japon - Europe - 
  - Las busquedas se pueden realizar en conjunto o individuales: Ejemplo si buscamos individual (se puede cargar una palabra clave y darle al boton de buscar sin llenar la lozalizacion o seleccionar algun departamento) si se decide buscar de forma acumulativa es decir de 2 o 3 filtros es posible.


#### Cosas que no realice en el proyecto
- No utilice el motor de plantilla visto dos clases antes de la entrega (PUG)
- No realice la modularizacion del lado del servidor "server/routes/api.js"
- No traduje la fecha al pasaar el mouse por la tarjeta
- No corregi la logica en la paginacion. El numero cambia tarde, debe ser un problema en donde lo llamo.


#### Cossas que si realice en el proyecto
- Modularizacion del lado del cliente:
  - Anteriormente tenia dodo en "public/js/script.js" ahora esta modularizado tema visto en clases.
- La traduccion se realiza solo en los puntos que dice la consigna (titulo, dinastia y cultura).
- La pagina recupera las imagenes con las copciones de filtro, por departamento, palabra Clave y Localizacion
- Las imagenes se muestran con una grilla de 4 Columnas utilizando grid.
- En caso de que el objeto contenga mas imagenes se agrega un boton para podeer ver el resto.
- Se muestra la fecha o aproximacion cuando see pasa el puntero por encima de la tarjeta
- Cada pagina muestra 20 objetos



#### Cosas a mejorar



  



## Paginacion
- **Descripcion:** 
- **Problema:** 
  La logica de la paginacion no funciona correctamente, me cambia de pagina luego de que se carguen los 20 elementos.

# Rutas del Servidor

## Ruta `/departments`
**Descripción:** Esta ruta devuelve una lista de los departamentos disponibles en el museo(API)

**Funcionamiento:**
- Realiza una solicitud `fetch` a la API del museo para obtener los departamentos.
- Si la solicitud es exitosa, responde con los datos en formato JSON.


## Ruta `/buscar`
**Descripción:** Esta ruta realiza una búsqueda de objetos de arte en función de los parámetros recibidos (palabra clave, localización y departamento).

**Parametros Query:**
- `palabra`: palabra clave a buscar.
- `localizacion`: filtra los objetos por localización geográfica.
- `departamentoId`: filtra los objetos por departamento.

**Funcionamiento:**
- Se construye la URL con los parámetros proporcionados y se realiza una solicitud `fetch` a la API del museo.
- Si se encuentran objetos, se devuelven los IDs de esos objetos en formato JSON.
- Si ocurre un error, se captura y se devuelve un mensaje de error con el estado HTTP 500.

## Ruta `/objeto/:id`
**Descripción:** Esta ruta obtiene los detalles de un objeto específico por su id y traduce algunos de sus campos (título, cultura, dinastía) al español.

**Funcionamiento:**
- Se hace una solicitud `fetch` a la API del museo para obtener la información del objeto
- Se traduce el `title`, `culture` y `dynasty` del objeto usando la función `translateText`
- Si la solicitud es exitosa, se responde con los datos traducidos


## Funcion `translateText`
**Descripcion:** Funcion  que se utiliza para traducir texto del ingles al español.

**Parámetros:**
- `text`: el texto que se va a traducir.

**Funcionamiento:**
- Si el texto es correcto, se realiza una solicitud a la API de traduccion (`node-google-translate-skidz`) para traducirlo 
- Si la traduccion es exitosa, se devuelve el texto traducido; de lo contrario, nos va a devolver un error.
- Si ocurre un error durante la traducción, se devuelve un mensaje de error.



------------------------------------------------------------------------------------------------------------------


# Registro de Problemas que he tenido a lo largo del desarrollo

#### Problemas que me he encontrado a lo largo del desarrollo 
 ## Aviso de Deprecacion de `punycode`
- Me aparecio un aviso de que `punycode` algun modulo estaba deprecado.


## Errores 404 
 - Recibia errores 404 al buscar datos, estaba llamando mal a los endpoint
  
## Duplicacion de Rutas
- La ruta para buscar por palabra clave y localizacion y la ruta para buscar por departamento estaban definidas con el mismo path `/search`, lo que me  causaba conflictos (me crasheaba la aplicacion) 


## Errores en el Lado del Cliente
- El cliente no estaba recibiendo los datos correctamente debido a posibles errores en la anidacion de URLs para las solicitudes y el manejo de datos
  
---
>>>>>>> 0134fa578277c3ad5dfca4dabb329049e88fe83e




