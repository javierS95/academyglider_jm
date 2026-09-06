# AcademyGlider — Sitio web

Presencia web oficial de **AcademyGlider**, escuela de parapente de **Javier Martínez**.
Sitio de una sola página (scroll), bilingüe (ES/EN), con todo el contenido editable desde un
CMS **sin tocar código**, galería alimentada por Instagram y WhatsApp como canal principal de
contacto.

> **Estado:** CMS conectado (Sanity, dataset `web`, Studio en
> <https://academyglider.sanity.studio>). Cursos, FAQ, una reseña, textos del Home y fotos
> del Home/CTA son **reales**; lo pendiente va marcado `[CONTENIDO DEMO — REEMPLAZAR]`.
> Ver [§ Contenido DEMO vs real](#contenido-demo-vs-real) y
> [§ Información que todavía falta](#información-que-todavía-falta).

---

## Índice

- [Objetivo](#objetivo)
- [Stack tecnológico](#stack-tecnológico)
- [Arquitectura general](#arquitectura-general)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Requisitos previos](#requisitos-previos)
- [Instalación local](#instalación-local)
- [Variables de entorno](#variables-de-entorno)
- [Scripts disponibles](#scripts-disponibles)
- [Desarrollo](#desarrollo)
- [Build de producción y verificación local](#build-de-producción-y-verificación-local)
- [Despliegue (Vercel)](#despliegue-vercel)
- [Dominio](#dominio)
- [CMS (Sanity)](#cms-sanity)
- [Estructura del contenido administrable](#estructura-del-contenido-administrable)
- [Gestión de contenido: cursos, reseñas, FAQ, textos ES/EN](#gestión-de-contenido)
- [Internacionalización (i18n)](#internacionalización-i18n)
- [Integración con Instagram](#integración-con-instagram)
- [Configuración de WhatsApp](#configuración-de-whatsapp)
- [Futura integración con Mercado Pago](#futura-integración-con-mercado-pago)
- [Contenido DEMO vs real](#contenido-demo-vs-real)
- [Decisiones técnicas relevantes](#decisiones-técnicas-relevantes)
- [Limitaciones conocidas](#limitaciones-conocidas)
- [Información que todavía falta](#información-que-todavía-falta)
- [Troubleshooting](#troubleshooting)
- [Credenciales y secretos](#credenciales-y-secretos)

---

## Objetivo

Una web rápida y visual que acompañe el recorrido **Instagram → Web → conocer los cursos →
WhatsApp**, transmitiendo la identidad de la escuela: naturaleza, aventura, libertad, vuelo y
atardecer. SEO no es prioritario; sólo se implementa lo técnico imprescindible.

## Stack tecnológico

| Capa           | Tecnología                                                                                                                  | Motivo                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Framework      | **Astro 5** (`output: static` + adaptador Vercel para las rutas `/api`)                                                     | HTML estático, JS mínimo, i18n nativo, imágenes optimizadas  |
| Estilos        | **Tailwind CSS v4** (`@tailwindcss/vite`) + tokens en `src/styles/global.css`                                               | Mobile-first, sistema de diseño consistente                  |
| Interactividad | `<script>` vanilla en componentes Astro (sin framework de UI)                                                               | Menú móvil, selector de idioma, FAQ, galería, botón flotante |
| CMS            | **Sanity** (Studio en `studio/`)                                                                                            | Contenido estructurado bilingüe, Studio gratuito, webhooks   |
| Galería        | Grilla de portadas de publicaciones de Instagram vía proxy propio `/api/ig-image` (sin token); opción de feed vía Graph API | Sin credenciales por defecto; fallback manual en el CMS      |
| Hosting        | **Vercel**                                                                                                                  | Deploy desde Git, cron functions, variables de entorno, SSL  |
| Lenguaje       | TypeScript                                                                                                                  | —                                                            |

## Arquitectura general

```
                 ┌─────────────┐     GROQ (build)          ┌──────────────┐
                 │   Sanity    │ ───────────────────────▶  │  Astro build │──▶ HTML/CSS/JS estático
                 │   (CMS)     │ ◀── webhook (Deploy Hook)  │   (Vercel)   │
                 └─────────────┘                           └──────┬───────┘
  Navegador ── <img src="/api/ig-image?code=…"> ──▶ Vercel Function (cache edge 7 días)
                                                     └──▶ instagram.com/p/<code>/media/  (portada, sin token)
  (fuente "instagram", opcional) GET /api/gallery ──▶ Instagram Graph API (con token)

             wa.me/56952559138?text=...  (WhatsApp, sin backend)
  Vercel Cron (semanal, solo con la Graph API) ──▶ refresh del token de 60 días
```

- **Sin base de datos propia.** Sanity es la única fuente de contenido.
- El contenido se resuelve **en tiempo de build**. Al publicar en Sanity, un webhook dispara un
  redeploy en Vercel.
- Si `PUBLIC_SANITY_PROJECT_ID` no está definido, el sitio usa el **fallback DEMO local**
  (`src/data/demoContent.ts`) para poder verse completo sin CMS.

## Estructura de carpetas

```
academyglider_jm/
├── astro.config.mjs          # i18n (es/en), adaptador Vercel, Tailwind
├── vercel.json               # Vercel Cron: refresco semanal del token IG (Graph API)
├── .env.example              # todas las variables, sin valores
├── package.json              # engines.node = 22.x
├── scripts/
│   ├── gen-demo-assets.mjs   # genera los SVG de marcador en public/demo/
│   └── export-demo-ndjson.mjs# genera seed/demo.ndjson desde demoContent.ts
├── seed/                     # NDJSON generado para sembrar Sanity (no versionado)
├── public/
│   ├── logo-academyglider.jpg
│   ├── favicon.svg
│   ├── photos/               # fotos reales de AcademyGlider (hero, CTA)
│   └── demo/                 # imágenes SVG de marcador (contenido pendiente)
├── src/
│   ├── pages/
│   │   ├── index.astro                    # ES  (/)
│   │   ├── en/index.astro                 # EN  (/en)
│   │   └── api/
│   │       ├── ig-image.ts               # proxy de portadas de Instagram (sin token)
│   │       ├── gallery.ts                 # feed Graph API (fuente "instagram", opcional)
│   │       └── cron/refresh-instagram-token.ts
│   ├── layouts/BaseLayout.astro
│   ├── components/
│   │   ├── SitePage.astro                 # ensambla la página completa
│   │   ├── Header.astro  Footer.astro  FloatingWhatsApp.astro
│   │   ├── DemoBadge.astro  SectionHeading.astro
│   │   └── sections/  Hero · Courses · About · Gallery · Reviews · Faq · Location · CtaFinal
│   ├── lib/
│   │   ├── sanity.ts          # cliente + query GROQ + fallback DEMO
│   │   ├── whatsapp.ts        # construcción de enlaces wa.me
│   │   └── instagram.ts       # shortcodes + Graph API + rotación de token
│   ├── i18n/
│   │   ├── ui.ts              # microcopy de INTERFAZ (no comercial)
│   │   └── utils.ts
│   ├── data/demoContent.ts    # contenido DEMO + real (fallback local / fuente del seed)
│   ├── styles/global.css      # tokens de diseño + utilidades
│   └── types.ts               # tipos = schemas de Sanity
└── studio/                    # Sanity Studio (proyecto independiente)
    ├── sanity.config.ts  sanity.cli.ts  deskStructure.ts
    └── schemaTypes/  objects · singletons · documents · index
```

## Requisitos previos

- **Node.js 22.x** (Vercel usa 22; el repo lo fija en `.nvmrc` y `engines`). Con Node 24 el
  build funciona pero emite un aviso.
- npm 10+.
- Cuentas (para producción): **Sanity** y **Vercel**. La galería no necesita credenciales;
  **Meta for Developers** sólo si se quiere el feed automático de la Graph API.

## Instalación local

```bash
git clone <repo>
cd academyglider_jm
npm install
cp .env.example .env        # opcional: sin Sanity, el sitio usa el contenido DEMO local
npm run dev                 # http://localhost:4321
```

El Studio de Sanity es un proyecto aparte (ya configurado, ver [§ CMS](#cms-sanity)):

```bash
cd studio
npm install
printf 'SANITY_STUDIO_PROJECT_ID="p0dkvy3j"\nSANITY_STUDIO_DATASET="web"\n' > .env
npm run dev                 # http://localhost:3333
```

> O simplemente edita en <https://academyglider.sanity.studio> sin instalar nada.

## Variables de entorno

Todas están documentadas en [`.env.example`](.env.example). Resumen:

| Variable                                                  | Obligatoria        | Uso                                            |
| --------------------------------------------------------- | ------------------ | ---------------------------------------------- |
| `PUBLIC_SITE_URL`                                         | recomendada        | URL pública (metadatos, enlaces absolutos)     |
| `PUBLIC_SANITY_PROJECT_ID`                                | prod               | Sin ella se usa el contenido DEMO local        |
| `PUBLIC_SANITY_DATASET`                                   | prod               | Normalmente `production`                       |
| `PUBLIC_SANITY_API_VERSION`                               | prod               | Fecha, p.ej. `2024-10-01`                      |
| `SANITY_API_READ_TOKEN`                                   | si dataset privado | Token de solo lectura                          |
| `SANITY_REVALIDATE_SECRET`                                | opcional           | Validar el webhook de revalidación             |
| `META_APP_ID` / `META_APP_SECRET`                         | galería IG         | App de Meta                                    |
| `INSTAGRAM_USER_ID`                                       | galería IG         | ID numérico de la cuenta                       |
| `INSTAGRAM_LONG_LIVED_TOKEN`                              | galería IG         | Token de 60 días (se rota por cron)            |
| `CRON_SECRET`                                             | galería IG         | Protege el endpoint de cron en Vercel          |
| `MP_ACCESS_TOKEN` / `MP_PUBLIC_KEY` / `MP_WEBHOOK_SECRET` | **no**             | Reservadas para Mercado Pago (sin implementar) |

**Cómo configurarlas:**

- Local: archivo `.env` en la raíz (ignorado por git).
- Producción: Vercel → Project → Settings → Environment Variables (una por entorno:
  Production / Preview / Development).
- El Studio usa `SANITY_STUDIO_PROJECT_ID` y `SANITY_STUDIO_DATASET` (prefijo `SANITY_STUDIO_`).

## Scripts disponibles

| Comando                            | Qué hace                                                         |
| ---------------------------------- | ---------------------------------------------------------------- |
| `npm run dev`                      | Servidor de desarrollo (`http://localhost:4321`)                 |
| `npm run build`                    | Build de producción a `dist/` + `.vercel/output/`                |
| `npm run preview`                  | Sirve el build localmente (rutas `/api` **no** se ejecutan aquí) |
| `npm run check`                    | Type-check de Astro/TS                                           |
| `npm run format` / `npm run lint`  | Prettier                                                         |
| `npm run seed`                     | Regenera `seed/demo.ndjson` desde `src/data/demoContent.ts`      |
| `node scripts/gen-demo-assets.mjs` | Regenera los SVG de `public/demo/`                               |

## Desarrollo

- Todo el texto **comercial/editorial** vive en Sanity (o en `demoContent.ts` como fallback),
  nunca en los componentes.
- El microcopy de **interfaz** (navegación, «Cerrar», `aria-label`…) vive en `src/i18n/ui.ts`.
  Ver [§ i18n](#internacionalización-i18n).
- Los badges «CONTENIDO DEMO» se controlan con `siteSettings.demoMode` (global) y el campo
  `isDemo` de cada documento.

## Build de producción y verificación local

```bash
npm run build
npm run preview        # http://localhost:4321 — HTML estático
```

> `npm run preview` sirve los archivos estáticos pero **no** ejecuta las funciones `/api/*`
> (galería / cron). Para probarlas localmente usa `npm run dev`, o `vercel dev` si tienes la
> CLI de Vercel.

Checklist de verificación:

- [ ] `/` y `/en` cargan; el selector de idioma alterna y mantiene el ancla del scroll.
- [ ] Cada CTA de WhatsApp abre `wa.me/56952559138` con el mensaje exacto.
- [ ] La galería muestra 6 cuadrados uniformes con las portadas reales de Instagram
      (`/api/ig-image?code=…` responde `image/jpeg`).
- [ ] El FAQ funciona como «chat» (categoría → pregunta → respuesta) y también sin JS (`<noscript>`).
- [ ] Cambiar `demoMode` en Sanity muestra/oculta los badges y el banner.
- [ ] Responsive a 360 / 768 / 1280 px.

## Despliegue (Vercel)

1. Importa el repo en Vercel. Framework preset: **Astro**. Root Directory: la raíz del repo.
2. Define las variables de entorno (ver arriba).
3. Deploy. Cada `git push` a `main` genera un deploy de producción; cada PR, un preview.
4. **Cron:** `vercel.json` ya define la rotación semanal del token de Instagram
   (`0 6 * * 1`). Requiere `CRON_SECRET` en las variables de entorno.
5. **Redeploy al publicar contenido:** en Vercel crea un _Deploy Hook_
   (Settings → Git → Deploy Hooks) y pégalo en Sanity
   (Studio → API → Webhooks) con un `GET`/`POST` al publicar. Opcionalmente valida con
   `SANITY_REVALIDATE_SECRET`.

> El Studio de Sanity se despliega aparte con `cd studio && npm run deploy`
> (queda en `https://<proyecto>.sanity.studio`). También puede alojarse embebido; hoy va
> separado por simplicidad.

## Dominio

Aún **no hay dominio**. Recomendación: registrarlo en **Cloudflare Registrar** (precio de
costo) o en **Vercel Domains** y apuntarlo a Vercel (Project → Settings → Domains). Sugerencias:
`academyglider.com` / `academyglider.cl`. Tras conectarlo, actualiza `PUBLIC_SITE_URL`.

## CMS (Sanity)

**Ya está configurado y en producción:**

| Dato                      | Valor                                           |
| ------------------------- | ----------------------------------------------- |
| Studio (editar contenido) | <https://academyglider.sanity.studio>           |
| Project ID                | `p0dkvy3j`                                      |
| Dataset del sitio         | **`web`** (público)                             |
| Gestión / miembros        | <https://www.sanity.io/manage/project/p0dkvy3j> |

> El dataset `production` del mismo proyecto contiene un **borrador anterior** (julio 2026, otra
> estructura). No se usa. Se puede borrar desde _Manage_ cuando se confirme que no hace falta.

### Editar contenido

- **En la nube:** entra a <https://academyglider.sanity.studio> con tu cuenta de Sanity.
- **En local:** `cd studio && npm install && npm run dev` → <http://localhost:3333>
  (usa `studio/.env` con `SANITY_STUDIO_PROJECT_ID` y `SANITY_STUDIO_DATASET=web`).
- **Dar acceso a otra persona:** Manage → **Members** → _Invite_ por email (rol `Editor`).

### Re-desplegar el Studio (tras cambiar los schemas)

```bash
cd studio && npm run deploy
```

### Volver a sembrar / resetear el contenido

```bash
npm run seed                                    # genera seed/demo.ndjson desde demoContent.ts
cd studio
npx sanity dataset import ../seed/demo.ndjson web --replace   # sobrescribe
```

El seed incluye las fotos reales de `public/photos/*`; el resto de imágenes se suben desde el
Studio. `seed/` no se versiona (se regenera).

### Variables del sitio

`.env` en la raíz (ver `.env.example`): `PUBLIC_SANITY_PROJECT_ID=p0dkvy3j`,
`PUBLIC_SANITY_DATASET=web`, `PUBLIC_SANITY_API_VERSION=2024-10-01`. En Vercel, las mismas.
Si `PUBLIC_SANITY_PROJECT_ID` queda vacío, el sitio usa el contenido local de `demoContent.ts`.

## Estructura del contenido administrable

**Singletons** (un único documento cada uno, en el menú «Contenido» del Studio):

| Documento                  | Contenido                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| ⚙️ Configuración del sitio | WhatsApp (número + mensaje), Instagram, **modo demostración**, logo, colores                                         |
| 🏔️ Home / Portada          | Título, subtítulo, CTAs, texto complementario, imagen de fondo                                                       |
| 👤 Quiénes somos           | Texto de Javier (**real**), cifra destacada, foto                                                                    |
| 📷 Galería (Instagram)     | Fuente (`posts`/`instagram`/`manual`), lista ordenada de enlaces de publicaciones, nº de fotos, imágenes de respaldo |
| 📍 Ubicación               | Lugar, «dirección pendiente», dirección, mapa, enlace de navegación, nota de atención                                |
| ✨ CTA final               | Título, texto, botón, fondo                                                                                          |
| 🔻 Footer                  | Frase corta, enlaces legales (ocultos por defecto)                                                                   |
| 🔤 Títulos de secciones    | Título + intro de cada sección (y saludo del FAQ)                                                                    |

**Colecciones** (varios documentos):

| Documento          | Campos clave                                                                                                                           | Acciones                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| 🎓 Curso           | nombre, descripción corta/larga, duración, precio + «mostrar/consultar», características, nivel, imagen, orden, **activo**, **isDemo** | crear · editar · eliminar · activar/desactivar · ordenar |
| 💬 Reseña          | autor, texto, estrellas (opc.), curso (opc.), foto (opc.), orden, **activa**, **isDemo**                                               | crear · editar · eliminar · activar/desactivar           |
| 🗂️ FAQ · Categoría | nombre, orden, **activa**                                                                                                              | crear · editar · eliminar · activar/desactivar           |
| ❓ FAQ · Pregunta  | categoría (ref), pregunta, respuesta, orden, **activa**, **isDemo**                                                                    | crear · editar · eliminar · activar/desactivar           |

Todos los textos son objetos **`{ Español, English }`**.

## Gestión de contenido

### Añadir / editar / eliminar un **curso**

Studio → **🎓 Cursos** → _Create new_ (o abrir uno). Rellena ES y EN. `Activo` controla la
visibilidad; `Orden` el orden en la grilla. Marca `isDemo` mientras sean datos de ejemplo.
Precio: número sin separadores + moneda (`CLP`); usa «Mostrar "Consultar"» para ocultarlo.
Publica (botón _Publish_). El sitio se actualiza en el siguiente deploy (webhook).

### Añadir / editar / eliminar una **reseña**

Studio → **💬 Reseñas** → _Create new_. Campos análogos. `Activa` la muestra/oculta.

### Añadir / editar / eliminar una **FAQ**

1. Crea las **categorías** en **🗂️ FAQ · Categorías**.
2. Crea las **preguntas** en **❓ FAQ · Preguntas**, cada una asignada a una categoría.
   `Orden` ordena dentro de la categoría. El front las presenta como un «chat» controlado
   (sin IA): el visitante elige categoría → pregunta → respuesta configurada.

### Administrar los **textos ES / EN**

Cada campo de texto tiene dos subcampos (Español / English). Edita ambos. Si un idioma queda
vacío, el sitio hace _fallback_ al español. Los títulos de secciones están en
**🔤 Títulos de secciones**.

## Internacionalización (i18n)

- Rutas: `/` = **español** (por defecto, sin prefijo), `/en` = **inglés**.
  Config en `astro.config.mjs` (`i18n`).
- **Frontera de contenido:**
  - Texto **comercial/editorial** → **Sanity** (`{ es, en }`). Nunca en componentes.
  - Microcopy de **interfaz** (no comercial: navegación, botones genéricos, `aria-label`,
    estados de carga) → `src/i18n/ui.ts`. Es la **única** excepción a «no editar código para
    cambiar textos», y sólo afecta a etiquetas funcionales.
- El selector de idioma (`Header.astro`) alterna entre `/` y `/en` preservando el `#ancla`.

## Integración con Instagram

La galería es una **grilla uniforme** de cuadrados (`aspect-square` + `object-cover`),
máx. 6 por defecto (`gallerySettings.maxItems`, 1–12 en el CMS). **Sin servicios externos.**
Tres fuentes, elegibles desde el CMS (**📷 Galería (Instagram) → Fuente**):

| Fuente               | Cómo funciona                                                                                                                  | Requiere                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| **`posts`** (actual) | Lista de URLs de publicaciones (`instagramPostUrls`, ordenadas). La portada de cada una se sirve por el proxy `/api/ig-image`. | Nada — sin token, sin app de Meta          |
| **`instagram`**      | Feed automático de las últimas publicaciones vía Instagram Graph API.                                                          | App de Meta + token de 60 días (ver abajo) |
| **`manual`**         | Imágenes subidas al CMS. Es también el **respaldo** de las otras dos.                                                          | Nada                                       |

### Fuente `posts` (actual, recomendada sin token)

- `instagramPostUrls` es una lista **ordenada** de URLs de publicaciones (vale `/p/…/` y
  `/reel/…/`, de cualquier cuenta — **no se filtra nada**). Vienen cargadas las **6 más
  recientes del perfil de @academyglider** (2026‑09, incluidas colaboraciones).
- **Cambiar la lista:** en Instagram abre el post → «···» → **Copiar enlace** y edita el
  array en el CMS. Al publicar en Sanity, el webhook redepliega y se regenera.
- **Cómo se ve la foto sin token:** `/api/ig-image?code=<shortcode>`
  (`src/pages/api/ig-image.ts`) pide desde el servidor la portada pública de Instagram
  (`https://www.instagram.com/p/<code>/media/?size=l`) y la re‑sirve desde nuestro dominio.
  Hace falta el proxy porque la imagen del CDN de Instagram trae
  `Cross-Origin-Resource-Policy: same-origin` y el navegador la bloquea si se carga directa.
  Se cachea **7 días** en el edge de Vercel (la URL del CDN dura ~14) → ~6 peticiones a
  Instagram por semana. Si una portada falla, el `onerror` oculta esa celda.
- Limitación: la lista es **fija** (no aparece sola una publicación nueva). Para eso está la
  fuente `instagram`.

### Fuente `instagram` (feed automático vía Graph API — opcional)

Requiere que **@academyglider** sea cuenta **Business o Creator**.

1. <https://developers.facebook.com> → **Create App** → tipo _Business_.
2. Añade el producto **Instagram** → _Instagram API with Instagram Login_.
3. Permisos: `instagram_business_basic`. Añade la cuenta como _Instagram Tester_ y acéptala
   desde la app de Instagram (Configuración → Apps y sitios web).
4. Genera un **token de corta duración** y cámbialo por uno de **larga duración** (60 días).
   Guarda en Vercel: `META_APP_ID`, `META_APP_SECRET`, `INSTAGRAM_USER_ID`,
   `INSTAGRAM_LONG_LIVED_TOKEN`, `CRON_SECRET`.
5. Cambia la fuente a `instagram` en el CMS. `/api/gallery` devolverá las publicaciones
   reales (cacheadas 1 día en el edge).

**Rotación del token:** `vercel.json` programa `GET /api/cron/refresh-instagram-token` cada
lunes. La Graph API devuelve un token nuevo en cada refresh (+60 días). **Persistirlo**
requiere: (recomendado) usar la API de Vercel (`VERCEL_TOKEN` + `PATCH` de la env var) desde
el cron, o guardarlo en un documento de Sanity. Mientras tanto el cron mantiene vivo el token
y registra el valor nuevo en los logs (ver TODO en el archivo).

## Configuración de WhatsApp

- Número y mensaje por defecto: **⚙️ Configuración del sitio** en Sanity
  (`whatsappNumber` = `56952559138`, sin `+`).
- Mensaje exacto actual (ES): `Hola! me gustaría tener más información sobre los cursos...`
- Overrides por sección: campos `whatsappMessageOverride` en Home, cada Curso y el CTA final.
- Enlaces generados por `src/lib/whatsapp.ts` → `https://wa.me/<num>?text=<url-encoded>`.
- **Botón flotante:** `FloatingWhatsApp.astro`, aparece al pasar el hero y se oculta con el
  menú móvil abierto.

## Futura integración con Mercado Pago

**No implementado.** Lo que ya está preparado:

- `course.price`, `course.currency`, `course.slug`, `course.pagoHabilitado` (bool, `readOnly`).
- Variables reservadas: `MP_ACCESS_TOKEN`, `MP_PUBLIC_KEY`, `MP_WEBHOOK_SECRET`.

Lo que habría que añadir cuando se decida:

1. `POST /api/checkout` — crea una _preference_ con el SDK de Mercado Pago a partir de un `slug`
   de curso; devuelve el `init_point`.
2. Botón «Reservar» en la tarjeta de curso (sólo si `pagoHabilitado`), que redirige a
   **Checkout Pro**.
3. `POST /api/webhooks/mercadopago` — recibe la confirmación de pago (validar firma con
   `MP_WEBHOOK_SECRET`), registra el estado (documento `order` en Sanity o email).
4. Páginas de retorno `success` / `failure` / `pending`.
5. Definir emisión de boleta/factura (fuera del alcance del sitio).

## Contenido DEMO vs real

**Real** (del prompt del cliente + rescatado de su borrador de Sanity de julio 2026):

- **Quiénes somos** — texto de Javier Martínez (del prompt; traducción EN a validar).
- **3 cursos** — Curso para principiantes, Perfeccionamiento (PPG2), Vuelo Biplaza. Nombres,
  resúmenes y descripciones ES/EN. _Del borrador de julio: conviene que Javier los revise._
  Sin precio (se muestra «Consultar»).
- **6 FAQ** con respuestas ES/EN en 3 categorías (del borrador de julio; revisar).
- **1 reseña** real: Javier Serrano, 5★.
- **Home** — titular y subtítulo del borrador de julio.
- **Fotos reales** — hero (`pilot-coastal-launch.jpg`) y fondo del CTA (`sunset-flight.jpg`).
- WhatsApp `+56 9 5255 9138` y mensaje · Instagram `@academyglider`.
- Ubicación: **Geopark Vizcachaz** + nota «atención con agenda previa» (dirección/mapa exactos
  pendientes — el borrador de julio tenía un mapa de «Parapente las Vizcachas» que **no** se
  usó por la diferencia de nombre; confirmar con Javier).

**DEMO** (marcado con `[CONTENIDO DEMO — REEMPLAZAR]` + badge): frase complementaria del Home,
texto del CTA final, 2 de las 3 reseñas, imágenes de cursos y foto de «Quiénes somos».

Mientras `siteSettings.demoMode` esté activo, esos elementos muestran el badge. Al terminar de
cargar lo real: `demoMode = false` y `isDemo = false` donde corresponda.

## Decisiones técnicas relevantes

- **Astro estático** en vez de Next.js: el sitio es casi todo contenido; menos JS, menos
  mantenimiento. Sólo `/api/*` se renderiza on-demand (adaptador Vercel).
- **Sin framework de UI para las islas:** la interactividad (menú, FAQ, galería, botón
  flotante) cabe en `<script>` vanilla; evita el peso de React/Preact.
- **Fallback DEMO local** (`demoContent.ts`): permite ver y desplegar el sitio antes de tener
  Sanity, y es la fuente del `seed`.
- **i18n a nivel de campo** (`{ es, en }`) en vez de documentos separados por idioma: más
  simple de editar para una sola persona.
- **Galería sin dependencias externas:** grilla uniforme de portadas de publicaciones. La
  imagen se sirve por un proxy propio (`/api/ig-image`) porque el CDN de Instagram pone
  `Cross-Origin-Resource-Policy: same-origin`. Sin token, sin servicios de terceros; la Graph
  API queda como opción para feed automático. Nunca se hace scraping de HTML.
- **Tipografías** (`Fraunces` + `Inter`, Google Fonts) y **paleta** (atardecer/cielo/montaña)
  son una propuesta inicial; ajustar al recibir la identidad de marca.

## Limitaciones conocidas

- Contenido DEMO visible (con badge) hasta que se cargue el real.
- Galería (fuente `posts`): la lista de publicaciones es **fija** (no aparece sola una nueva).
  Para un feed que se actualice solo hay que usar la fuente `instagram` (Graph API + token).
  El proxy `/api/ig-image` depende del endpoint público de portadas de Instagram
  (`/p/<code>/media/?size=l`); si Meta lo bloqueara, cambiar la fuente a `manual`. Ese
  endpoint es algo inestable bajo ráfagas: el proxy reintenta 1 vez y el edge cachea 7 días.
- Feed `instagram` (Graph API): la persistencia automática del token rotado está pendiente
  (ver §Instagram).
- El logo es blanco sobre fondo negro (JPG). Falta una versión con **fondo transparente**
  (PNG/SVG) para superponerlo limpio sobre fotos.
- Sección Ubicación sin mapa hasta confirmar dirección/coordenadas.
- Traducciones EN de contenido real (Quiénes somos) pendientes de validación.
- `npm run preview` no ejecuta las rutas `/api`.

## Información que todavía falta

Para pasar de DEMO a real (editar en <https://academyglider.sanity.studio>):

- **Cursos:** Javier revisa las 3 descripciones (vienen del borrador de julio). ¿Precios
  (mostrar/ocultar)? ¿Requisitos, cupos, duración del curso para principiantes?
- **FAQ:** Javier revisa las 6 respuestas (borrador de julio).
- **Ubicación:** dirección exacta / enlace de Google Maps / coordenadas de Geopark Vizcachaz.
  El borrador de julio tenía un mapa de «Parapente las Vizcachas» (−33.5964885, −70.5044263) —
  confirmar si es el lugar o descartarlo.
- **Home:** ¿mantener «Bienvenid@ a AcademyGlider» o un titular más potente? Frase
  complementaria (sigue en DEMO).
- **CTA final:** texto (sigue en DEMO).
- **Quiénes somos:** foto de Javier; validar la traducción EN.
- **Reseñas:** 2 de las 3 son DEMO — reemplazar por reales.
- **Fotos:** imágenes propias para las tarjetas de curso.
- **Marca:** logo con fondo transparente (PNG/SVG); paleta y tipografías definitivas.
- **Legal:** razón social / RUT para el footer; política de privacidad (sólo si se activa la
  Graph API de Instagram).
- **Dominio** deseado y quién lo registra.
- **Galería:** revisar la lista de publicaciones de Instagram en el CMS.

## Troubleshooting

| Síntoma                                                | Causa / solución                                                                                                                                               |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| El build avisa «Node.js version (24) is not supported» | Usa Node 22 (`nvm use 22`). El build igual funciona.                                                                                                           |
| Una portada de la galería no carga                     | `/api/ig-image` da 502/404 para ese post (borrado/privado, o límite transitorio de Instagram). El `onerror` oculta la celda; se reintenta al expirar la caché. |
| La galería sale con las imágenes de respaldo           | Fuente `posts` con la lista vacía o enlaces inválidos, o fuente `instagram` sin token. Revisa `instagramPostUrls` en el CMS y los logs de `/api/ig-image`.     |
| Una incrustación de Instagram no aparece               | El enlace debe ser público y con formato `/p/…/` o `/reel/…/`. Reels/posts de cuentas privadas o borrados no se incrustan.                                     |
| Cambié algo en Sanity y el sitio no cambia             | Falta el Deploy Hook (webhook Sanity → Vercel), o el deploy aún no terminó.                                                                                    |
| «Cannot find name 'process'» en `astro check`          | `npm i -D @types/node@22`.                                                                                                                                     |
| El Studio no abre / «projectId» inválido               | Falta `SANITY_STUDIO_PROJECT_ID` (o `studio/.env`).                                                                                                            |
| Estilos sin aplicar tras cambiar tokens                | Reinicia `npm run dev` (Tailwind v4 relee `@theme`).                                                                                                           |
| `npm run seed` falla                                   | Requiere Node ≥ 22.6 (strip de tipos).                                                                                                                         |
| Las funciones `/api` no responden en `npm run preview` | Es lo esperado; usa `npm run dev` o `vercel dev`.                                                                                                              |

## Credenciales y secretos

- **Nunca** se commitea `.env` ni tokens reales. `.env.example` documenta las claves sin valores.
- Secretos en producción: sólo en Vercel (Environment Variables) y en Sanity (Members / tokens).
- Rota `INSTAGRAM_LONG_LIVED_TOKEN`, `META_APP_SECRET` y cualquier token de Sanity si se filtran.
- El `CRON_SECRET` protege el endpoint de cron: Vercel lo envía como `Authorization: Bearer …`.

---

_Mantén este README actualizado ante cualquier cambio de arquitectura, configuración,
instalación, despliegue o CMS. Es parte del entregable._
