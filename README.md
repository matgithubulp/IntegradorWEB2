
=======
# IntegradorWEB2

## tecnologias utilizadas
-express
-node-fetch
-google-translate


## Funcionamiento:
  - La url de la pagina suele demorar en cargar por que render te da entre 10 y 50sg de demora si sos free.
  - Las palabrass claves deben ser ingresadas en ingles al igual que las lozalizaciones,
  - Las localizaciones deben de empezar en mayusculas seria valido Japan - Europe - 
  - Las busquedas se pueden realizar en conjunto o individuales: Ejemplo si buscamos individual (se puede cargar una palabra clave y darle al boton de buscar sin llenar la lozalizacion o seleccionar algun departamento) si se decide buscar de forma acumulativa es decir de 2 o 3 filtros es posible.

### Funcionamiento: Recomendaciones
- Si se busca por localizacion utilizar Japan -> es de las culturas mas completa. Muchos objetos no traen cultura definida
- Si se busca solo por departamento recomiendo "Arms and Armor", "Musical Instruments" y "Egyptian Art" -> A mi parecer son los que mas destacan en lo visual, con esto me refiero a que es mas facil identificar si la busqueda la hace bien. Seria raro que en "Arms and Armor" te traiga un cuadro de flores.
-Si se busca por palabra clave recomiendo ingresar "weapons" -> es una de las mas completa, la matoria de objetos trae cultura, es visualmente obvia y la traduccion esta mas completa. Por ejemplo si se busca "book" hay muchos libros sin imagenes o de titulo tienen book.
Si se quiere buscar una frase mas larga recomiendo "Axe Head" -> visualmente es mas facil de ver si es correcto o no.
- si se quiere buscar por palabra clave y localizzacion recomiendo "Armors" y "Europe" -> ""

#### Cosas que no realice en el proyecto
- No utilice el motor de plantilla visto dos clases antes de la entrega (PUG)
- No realice la modularizacion del lado del servidor "server/routes/api.js"
- No traduje la fecha al pasar el mouse por la tarjeta -> no lo pedia la consigna
- No corregi la logica en la paginacion. El numero cambia tarde, debe ser un problema en donde llamo a la funcion.


#### Cossas que si realice en el proyecto
- Modularizacion del lado del cliente:
  - Anteriormente tenia dodo en "public/js/script.js" ahora esta modularizado.
- La traduccion se realiza solo en los puntos que dice la consigna (titulo, dinastia y cultura).
- La pagina recupera las imagenes con las copciones de filtro, por departamento, palabra Clave y Localizacion
- Las imagenes se muestran con una grilla de 4 Columnas utilizando grid.
- En caso de que el objeto contenga mas imagenes se agrega un boton para podeer ver el resto.
- Se muestra la fecha o aproximacion cuando see pasa el puntero por encima de la tarjeta
- Cada pagina muestra 20 objetos



#### Cosas que se podrian mejorar
- realizar la traduccion de la fecha
- que cargue objetos  al entrar a la pagina.
- realizar una modularizacion mas completa y facil de leer
- se podria traducir lo ingresado por input para que el usuario no necesariamente tenga que ingresar palabras en ingles o que permita ambos.
- Ccuando la pagina no tenga mas objetos desactive el boton de siguiente.






#### Errores que me he tenido a lo largo del desarrollo




  





