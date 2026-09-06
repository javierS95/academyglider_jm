# PROMPT — ACADEMYGLIDER WEB

Quiero desarrollar una página web para **AcademyGlider**, una escuela de parapente.

Voy a utilizar tu modo **Planner**, por lo que en esta primera etapa **NO quiero que programes ni escribas la aplicación completa**.

Quiero que primero analices el proyecto, identifiques la información que falta, propongas la arquitectura y el plan de implementación, y me hagas las preguntas necesarias.

## REGLA PRINCIPAL

**NO INVENTES INFORMACIÓN REAL SOBRE ACADEMYGLIDER.**

Sin embargo, para esta primera etapa necesito poder **visualizar cómo se verá la página completa**, por lo que puedes utilizar contenido ficticio de demostración en las secciones donde todavía no tenemos información.

Todo contenido ficticio debe estar claramente identificado como:

**[CONTENIDO DEMO — REEMPLAZAR]**

o mediante otra forma que permita distinguirlo inequívocamente del contenido real.

Este contenido demo debe existir únicamente para visualizar y probar el diseño y posteriormente debe poder reemplazarse desde el sistema de administración **sin modificar código**.

No presentes nunca información inventada como si fuera información real de AcademyGlider.

---

# 1. SOBRE ACADEMYGLIDER

Esta es información real y autorizada para utilizar en la página:

Soy **Javier Martínez**, instructor de parapente, y llevo más de **20 años** dedicado a este deporte. A lo largo de este tiempo he desarrollado experiencia en **distintas modalidades de vuelo**, formando pilotos con una metodología de enseñanza basada en la **seguridad**, la **técnica** y el **aprendizaje progresivo**.

Mi mayor motivación es compartir el vuelo de una forma **responsable**, entregando a cada alumno las herramientas necesarias para que pueda desarrollar **autonomía** y **confianza** en cada etapa de su formación.

Además de enseñar, disfruto explorando Chile desde el aire y la montaña. El vuelo me ha permitido descubrir lugares únicos, recorrer distintos paisajes y vivir experiencias que hoy forman parte de mi forma de enseñar y entender este deporte.

Creo que el parapente no solo consiste en despegar, sino en **comprender el entorno, tomar buenas decisiones y disfrutar cada vuelo** con respeto por la naturaleza y por la seguridad. Esa es la filosofía que transmito en cada curso y en cada salida a la montaña.

Este contenido puede utilizarse como contenido real para la sección **Quiénes somos**.

No alteres el significado de este texto ni agregues afirmaciones sobre Javier que no estén contenidas aquí.

---

# 2. OBJETIVO DEL SITIO

La página será la presencia web oficial de AcademyGlider.

AcademyGlider es una **escuela de parapente** que ofrece cursos para:

- principiantes
- pilotos/alumnos que quieren llevar sus habilidades al siguiente nivel

La propuesta de marca debe transmitir:

- naturaleza
- aventura
- libertad
- vuelo
- atardecer
- conexión con el entorno
- emoción
- seguridad
- profesionalismo

El estilo visual debe ser **natural y aventurero**, evitando que se vea como una plantilla corporativa genérica.

---

# 3. ESTRUCTURA

Quiero una **sola página tipo scroll**, no un sitio dividido en múltiples páginas.

La estructura inicial será:

1. Home
2. Servicios / Cursos
3. Quiénes somos
4. Galería de fotos
5. Reviews
6. FAQ
7. Ubicación
8. CTA final / Contacto
9. Footer

Puedes proponer modificaciones si existe una razón UX clara, pero no agregues secciones innecesarias.

---

# 4. HOME

Debe ser una sección visualmente potente.

Debe transmitir inmediatamente:

**parapente + naturaleza + aventura + libertad + vuelo.**

Debe utilizarse el logo oficial de AcademyGlider proporcionado en esta conversación.

**No modifiques ni rediseñes el logo.**

El contenido textual definitivo del Home todavía no está definido.

Para poder visualizar la sección durante el desarrollo, utiliza contenido **DEMO**, claramente marcado como:

**[CONTENIDO DEMO — REEMPLAZAR]**

Puedes crear:

- título
- subtítulo
- CTA
- texto complementario

pero debe quedar claro que es contenido provisional.

Debe existir un CTA hacia WhatsApp.

---

# 5. SERVICIOS / CURSOS

Debe existir una sección para mostrar los cursos de AcademyGlider.

Para poder visualizar correctamente el diseño, crea inicialmente **2 cursos ficticios de demostración**, con nombres, descripciones, duración y precios inventados.

Los nombres, precios y características son solamente ejemplos visuales.

Deben estar marcados como:

**[DEMO — REEMPLAZAR CON INFORMACIÓN REAL]**

NO presentes estos datos como información real de AcademyGlider.

La estructura del contenido debe permitir posteriormente:

- crear un curso
- editarlo
- eliminarlo
- activarlo/desactivarlo
- cambiar nombre
- cambiar descripción
- cambiar precio
- cambiar duración
- cambiar características
- modificar cualquier otro campo relevante

Todo esto **sin modificar código**.

La arquitectura debe permitir agregar nuevos cursos en el futuro sin tener que modificar manualmente el frontend.

---

# 6. QUIÉNES SOMOS

Utiliza el texto real proporcionado en la sección **"Sobre AcademyGlider"**.

Debe presentarse de una forma visualmente atractiva y alineada con la identidad de aventura, naturaleza y vuelo.

No inventes:

- cargos adicionales
- cantidad de instructores
- años adicionales de experiencia
- certificaciones
- logros
- lugares donde se ha volado
- afiliaciones
- premios
- cualquier otro dato que no esté explícitamente proporcionado.

El contenido debe poder modificarse posteriormente sin tocar código.

---

# 7. GALERÍA

Por ahora quiero que **las fotografías provengan exclusivamente del Instagram oficial de AcademyGlider**.

Instagram:

**@academyglider**

No quiero tener que subir las fotografías manualmente al sitio.

La página debe integrarse con Instagram para mostrar sus publicaciones/fotografías.

Durante la planificación evalúa cuál es actualmente la forma técnicamente más adecuada y sostenible de realizar esta integración.

Ten en cuenta las restricciones actuales de Instagram/Meta.

Evita soluciones basadas en scraping frágil.

La galería debe ser visualmente atractiva y coherente con el diseño.

Por ahora:

**Instagram será la única fuente de fotografías.**

No necesito:

- biblioteca propia de imágenes
- sistema de upload
- gestor de fotografías
- otras redes sociales

---

# 8. REVIEWS

Debe existir una sección de reviews.

Por ahora las reviews serán **ingresadas manualmente por nosotros mediante el sistema de administración**.

Para poder visualizar la sección, crea inicialmente **3 reviews completamente ficticias de DEMO**.

Cada una debe estar claramente identificada como:

**[REVIEW DEMO — REEMPLAZAR]**

NO inventes testimonios y los presentes como experiencias reales de clientes.

El sistema debe permitir posteriormente:

- agregar review
- editar review
- eliminar review
- activar/desactivar review

No necesito integración con Google Reviews por ahora.

---

# 9. FAQ

Quiero una sección de preguntas frecuentes con una experiencia similar a un **chatbot controlado**, pero **SIN inteligencia artificial inicialmente**.

No quiero un chatbot capaz de inventar respuestas.

Quiero que el usuario pueda seleccionar categorías/preguntas y recibir respuestas previamente configuradas.

Esto es solamente un ejemplo conceptual.

Para poder visualizar correctamente la sección, crea varias preguntas y respuestas **DEMO**.

Por ejemplo:

**[FAQ DEMO — REEMPLAZAR]**

Las preguntas y respuestas reales serán entregadas posteriormente.

El contenido debe ser completamente administrable sin modificar código.

Debe permitir:

- crear preguntas
- editar preguntas
- eliminar preguntas
- activar/desactivar preguntas
- organizar preguntas por categorías
- modificar respuestas

---

# 10. UBICACIÓN

La ubicación actual será:

**Geopark Vizcachaz**

Pero todavía necesito proporcionar la dirección exacta.

**No inventes la dirección.**

Antes de implementar el mapa definitivo, pregúntame por:

- dirección exacta
- enlace de Google Maps o
- coordenadas

La sección debe mostrar:

- dirección
- mapa
- opción para abrir navegación

La información de atención será:

**Atención con agenda previa. Coordina tu visita por WhatsApp.**

No habrá un horario fijo.

---

# 11. WHATSAPP

El principal canal de contacto será WhatsApp.

Número:

**+56 9 5255 9138**

Debe existir un botón de WhatsApp en lugares estratégicos.

También quiero un **botón flotante de WhatsApp** durante el scroll.

El mensaje predefinido debe ser exactamente:

> Hola! me gustaría tener más información sobre los cursos...

El enlace debe abrir WhatsApp con ese mensaje preparado.

No necesito:

- formulario de contacto
- newsletter
- email
- CRM
- teléfono adicional

salvo que exista una razón técnica importante. Si consideras que algo de esto es necesario, pregúntame antes.

---

# 12. INSTAGRAM

Instagram oficial:

**@academyglider**

Debe existir un botón claramente visible hacia el Instagram oficial.

Además, Instagram alimentará la galería.

No agregar otras redes sociales.

---

# 13. IDIOMAS

La página debe estar disponible en:

- Español
- English

Debe existir un selector de idioma claro.

MUY IMPORTANTE:

Los textos en ambos idiomas deben ser administrables sin modificar código.

No quiero textos comerciales directamente escritos dentro de componentes del frontend.

Para el contenido que todavía no existe, utiliza contenido DEMO claramente marcado.

---

# 14. CTA FINAL

Debe existir una sección CTA antes del footer.

Debe ser visualmente potente y transmitir:

- aventura
- libertad
- naturaleza
- vuelo
- atardecer

Debe llevar principalmente a WhatsApp.

El texto definitivo todavía no está definido.

Utiliza un texto **DEMO**, claramente marcado como tal, para poder visualizar la sección.

---

# 15. FOOTER

El footer debe ser simple.

Debe incluir:

- AcademyGlider
- Instagram
- WhatsApp
- ubicación

No quiero un footer sobrecargado.

Debe quedar preparado para incorporar información legal en el futuro si fuese necesario.

---

# 16. MERCADO PAGO

Quiero que la arquitectura quede preparada para incorporar posteriormente un sistema de pago mediante **Mercado Pago**.

Por ahora:

**NO implementar pagos.**

Quiero que la planificación contemple cómo podría incorporarse posteriormente.

No quiero construir un checkout innecesario ahora.

Debe quedar claro qué habría que agregar cuando decidamos implementar Mercado Pago.

---

# 17. ADMINISTRACIÓN DEL CONTENIDO

Este es uno de los requisitos MÁS IMPORTANTES.

**NO quiero depender del código para administrar el contenido.**

Quiero poder administrar sin programación:

- textos
- cursos
- precios
- descripciones
- características
- reviews
- FAQ
- categorías de FAQ
- CTAs
- información de ubicación
- información de contacto
- contenido en español
- contenido en inglés
- cualquier otro contenido que pueda cambiar con el tiempo

Quiero que el contenido esté separado del frontend.

No quiero tener que editar:

`.js`
`.jsx`
`.ts`
`.tsx`
`.html`
`.json`

ni ningún otro archivo de código para cambiar información de la página.

Evalúa y recomienda un CMS o sistema equivalente.

No conozco todavía qué CMS utilizar.

Prioridades:

1. facilidad de administración
2. no depender de desarrolladores
3. bajo mantenimiento
4. buena integración
5. costos razonables
6. facilidad de despliegue

---

# 18. HOSTING Y DEPLOYMENT

Actualmente:

- no existe dominio
- no existe hosting

Quiero evaluar alternativas sencillas de despliegue.

Prioridades:

- fácil publicación
- fácil actualización
- bajo mantenimiento
- dominio propio
- gestión sencilla de variables/credenciales
- buena integración con el CMS

No elijas una solución solamente porque sea técnicamente sofisticada.

---

# 19. RESPONSIVE

Debe funcionar correctamente en:

- móvil
- tablet
- desktop

Quiero un enfoque **mobile-first**.

La experiencia principal que quiero optimizar es:

**Instagram → Web → conocer cursos → WhatsApp**

Debe ser rápida, clara y visual.

---

# 20. SEO

SEO **no es una prioridad para este proyecto**.

No quiero agregar una estrategia SEO ni funcionalidades adicionales únicamente para posicionamiento.

Implementa solamente lo necesario a nivel técnico para que la web funcione correctamente.

---

# 21. DISEÑO

Dirección visual:

**Natural + aventurero + libertad + vuelo + naturaleza + atardecer.**

Debe sentirse como una escuela de parapente profesional, pero conectada con la aventura y la naturaleza.

Quiero:

- diseño moderno
- mucho protagonismo visual
- fotografías grandes
- buena tipografía
- jerarquía clara
- animaciones sutiles
- transiciones elegantes
- excelente experiencia móvil

No quiero:

- diseño corporativo genérico
- exceso de tarjetas
- exceso de texto
- apariencia de plantilla
- animaciones excesivas
- elementos decorativos innecesarios

Las fotografías de Instagram deben tener un papel importante.

---

# 22. NAVEGACIÓN

Una única página con scroll.

La navegación debe permitir saltar a:

- Home
- Cursos
- Quiénes somos
- Galería
- Reviews
- FAQ
- Ubicación
- Contacto

Debe existir scroll suave.

En móvil la navegación debe estar especialmente bien resuelta.

Evalúa un botón flotante de WhatsApp siempre visible.

---

# 23. CONTENIDO DEMO

Para esta primera versión necesito poder **ver la página completa funcionando**, aunque todavía no tenga toda la información real.

Por lo tanto, puedes crear contenido ficticio para:

- Home
- Cursos
- Reviews
- FAQ
- CTA
- textos secundarios
- cualquier sección que todavía no tenga contenido real

Pero:

### TODO contenido ficticio debe estar claramente identificado como DEMO.

No quiero que un visitante real pueda confundirlo con información oficial.

La estructura debe quedar preparada para reemplazar ese contenido desde el CMS posteriormente.

El contenido real actualmente disponible es exclusivamente:

1. Información de AcademyGlider proporcionada en este prompt.
2. Instagram @academyglider.
3. WhatsApp +56 9 5255 9138.
4. Ubicación general: Geopark Vizcachaz.
5. Atención con agenda previa coordinada por WhatsApp.
6. Idiomas español e inglés.
7. Logo proporcionado.

---

# 24. INFORMACIÓN QUE TODAVÍA FALTA

Durante tu planificación debes identificar exactamente qué información adicional necesitas para convertir la versión DEMO en una versión real.

No asumas las respuestas.

Por ejemplo, posiblemente necesitemos:

- dirección exacta
- coordenadas/mapa
- nombres reales de los cursos
- precios
- duración
- requisitos
- contenido de cada curso
- información adicional sobre AcademyGlider
- contenido definitivo del Home
- preguntas frecuentes
- reviews reales
- CTA definitivo
- cualquier información legal necesaria
- etc.

Hazme las preguntas necesarias.

---

# 25. README — OBLIGATORIO

El proyecto debe incluir y mantener un **README.md completo y actualizado**.

No quiero un README genérico generado automáticamente.

El README debe documentar como mínimo:

- descripción del proyecto
- objetivo de la aplicación
- stack tecnológico utilizado
- arquitectura general
- estructura de carpetas
- cómo instalar el proyecto localmente
- dependencias
- variables de entorno necesarias
- cómo configurar las variables de entorno
- cómo ejecutar el proyecto en desarrollo
- cómo hacer un build de producción
- cómo ejecutar/verificar la versión de producción localmente
- cómo desplegarlo
- plataforma de hosting utilizada
- configuración del CMS
- cómo acceder/configurar el CMS
- estructura del contenido administrable
- cómo agregar/editar/eliminar cursos
- cómo agregar/editar/eliminar reviews
- cómo agregar/editar/eliminar FAQ
- cómo administrar los textos en español e inglés
- integración con Instagram
- configuración de WhatsApp
- futura integración con Mercado Pago
- configuración de dominio, cuando corresponda
- troubleshooting de problemas comunes
- decisiones técnicas relevantes
- limitaciones conocidas
- cualquier credencial o secreto requerido, **sin incluir secretos reales en el repositorio**

El README debe ser comprensible para otra persona que reciba el proyecto y necesite ejecutarlo o mantenerlo.

### IMPORTANTE

Cada vez que durante el desarrollo se modifique la arquitectura, configuración, instalación, deployment, CMS o cualquier aspecto relevante del proyecto, **actualiza también el README.md**.

El README debe considerarse parte del entregable, no un documento opcional.

---

# 26. PROCESO DE TRABAJO

En esta primera etapa quiero que trabajes como **arquitecto y planificador**, no como programador.

### FASE 1 — Análisis

Analiza todos los requisitos.

Identifica:

- requisitos funcionales
- requisitos visuales
- integraciones
- contenido
- administración
- posibles problemas
- dependencias
- información faltante

### FASE 2 — Preguntas

Hazme una lista concreta de preguntas necesarias.

No avances asumiendo las respuestas.

### FASE 3 — Arquitectura

Propón:

- frontend
- backend, si realmente es necesario
- CMS
- base de datos, si fuese necesaria
- integración Instagram
- WhatsApp
- futura integración Mercado Pago
- internacionalización
- hosting
- deployment
- dominio
- manejo de credenciales
- estructura del contenido

Para cada decisión importante:

- explica qué alternativas existen
- recomienda una
- explica brevemente por qué

### FASE 4 — Estructura del CMS

Define qué contenido debería poder administrarse.

Por ejemplo:

- cursos
- reviews
- FAQ
- textos
- traducciones
- configuración
- etc.

### FASE 5 — Estructura UX/UI

Propón cómo organizarías visualmente la página y el scroll.

### FASE 6 — Plan de desarrollo

Divide la implementación en etapas lógicas.

---

# REGLA FINAL

**NO EMPIECES A PROGRAMAR TODAVÍA.**

Primero quiero revisar:

1. tus preguntas
2. tu propuesta de arquitectura
3. la solución de CMS
4. la estrategia de Instagram
5. la estrategia de deployment
6. la estructura del contenido
7. el plan de desarrollo

Después de que yo apruebe el plan podremos comenzar la implementación.

Si falta información:

**PREGUNTA.**

Si existen varias alternativas:

**EXPLICA Y RECOMIENDA.**

Si no tienes información real:

**USA CONTENIDO DEMO Y MARCA CLARAMENTE QUE ES DEMO.**

**NO INVENTES INFORMACIÓN REAL SOBRE ACADEMYGLIDER.**

---

# DATOS CONFIRMADOS

**Nombre:** AcademyGlider  
**Actividad:** Escuela de parapente  
**Instructor:** Javier Martínez  
**Experiencia:** Más de 20 años dedicado al parapente  
**Instagram:** @academyglider  
**WhatsApp:** +56 9 5255 9138  
**Mensaje WhatsApp:** "Hola! me gustaría tener más información sobre los cursos..."  
**Ubicación:** Geopark Vizcachaz  
**Atención:** Agenda previa coordinada por WhatsApp  
**Idiomas:** Español / Inglés  
**Galería:** Instagram  
**Reviews:** Manuales mediante sistema administrable  
**FAQ:** Interactivo, sin IA inicialmente  
**Mercado Pago:** Preparar arquitectura, implementar posteriormente  
**Sitio:** One-page / scroll  
**Hosting:** Por definir  
**Dominio:** Por definir  
**SEO:** No prioritario  
**Estética:** Natural, aventurera, naturaleza, atardecer, libertad y vuelo  
**Logo:** Archivo proporcionado en la conversación

**Todo lo demás que no esté explícitamente confirmado debe preguntarse o tratarse como contenido DEMO.**
