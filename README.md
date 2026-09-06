# AcademyGlider — Sitio web

Presencia web oficial de **AcademyGlider**, escuela de parapente de **Javier Martínez**.
Sitio de una sola página (scroll), bilingüe (ES/EN), con todo el contenido editable desde un
CMS **sin tocar código**, galería alimentada por Instagram y WhatsApp como canal principal de
contacto.

> **Estado:** versión inicial con **contenido de demostración** claramente marcado
> (`[CONTENIDO DEMO — REEMPLAZAR]`). Ver [§ Contenido DEMO vs real](#contenido-demo-vs-real)
> y [§ Información que todavía falta](#información-que-todavía-falta).

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

| Capa           | Tecnología                                                                        | Motivo                                                       |
| -------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Framework      | **Astro 5** (`output: static` + adaptador Vercel para las rutas `/api`)           | HTML estático, JS mínimo, i18n nativo, imágenes optimizadas  |
| Estilos        | **Tailwind CSS v4** (`@tailwindcss/vite`) + tokens en `src/styles/global.css`     | Mobile-first, sistema de diseño consistente                  |
| Interactividad | `<script>` vanilla en componentes Astro (sin framework de UI)                     | Menú móvil, selector de idioma, FAQ, galería, botón flotante |
| CMS            | **Sanity** (Studio en `studio/`)                                                  | Contenido estructurado bilingüe, Studio gratuito, webhooks   |
| Galería        | **Instagram Graph API** (Instagram API with Instagram Login) vía `/api/instagram` | Fuente oficial; fallback manual en el CMS                    |
| Hosting        | **Vercel**                                                                        | Deploy desde Git, cron functions, variables de entorno, SSL  |
| Lenguaje       | TypeScript                                                                        | —                                                            |

## Arquitectura general

```
                 ┌─────────────┐     GROQ (build)      ┌──────────────┐
                 │   Sanity    │ ───────────────────▶  │  Astro build │──▶ HTML/CSS/JS estático
                 │  (CMS)      │ ◀── webhook ───────   │   (Vercel)   │
                 └─────────────┘   (Deploy Hook)       └──────┬───────┘
                                                              │
  Navegador ── GET /api/instagram ──▶ Vercel Function ──▶ Instagram Graph API
                     │                        │
                     │                        └─ si falla / sin token ─▶ fallback: galería manual del CMS
                     ▼
             wa.me/56952559138?text=...  (WhatsApp, sin backend)

  Vercel Cron (semanal) ──▶ /api/cron/refresh-instagram-token ──▶ renueva el token de 60 días
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
├── vercel.json               # Vercel Cron: rotación del token de Instagram
├── .env.example              # todas las variables, sin valores
├── package.json              # engines.node = 22.x
├── scripts/
│   ├── gen-demo-assets.mjs   # genera los SVG de marcador en public/demo/
│   └── export-demo-ndjson.mjs# genera seed/demo.ndjson desde demoContent.ts
├── seed/demo.ndjson          # contenido inicial para importar en Sanity (generado)
├── public/
│   ├── logo-academyglider.jpg
│   ├── favicon.svg
│   └── demo/                 # imágenes SVG de demostración
├── src/
│   ├── pages/
│   │   ├── index.astro                    # ES  (/)
│   │   ├── en/index.astro                 # EN  (/en)
│   │   └── api/
│   │       ├── instagram.ts               # feed cacheado + fallback
│   │       └── cron/refresh-instagram-token.ts
│   ├── layouts/BaseLayout.astro
│   ├── components/
│   │   ├── SitePage.astro                 # ensambla la página completa
│   │   ├── Header.astro  Footer.astro  FloatingWhatsApp.astro
│   │   ├── DemoBanner.astro  DemoBadge.astro  SectionHeading.astro
│   │   └── sections/  Hero · Courses · About · Gallery · Reviews · Faq · Location · CtaFinal
│   ├── lib/
│   │   ├── sanity.ts          # cliente + query GROQ + fallback DEMO
│   │   ├── whatsapp.ts        # construcción de enlaces wa.me
│   │   └── instagram.ts       # Graph API + rotación de token
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
- Cuentas (para producción): **Sanity**, **Vercel**, **Meta for Developers** (Instagram).

## Instalación local

```bash
git clone <repo>
cd academyglider_jm
npm install
cp .env.example .env        # opcional: sin Sanity, el sitio usa el contenido DEMO local
npm run dev                 # http://localhost:4321
```

El Studio de Sanity es un proyecto aparte:

```bash
cd studio
npm install
# define SANITY_STUDIO_PROJECT_ID (ver §CMS) y luego:
npm run dev                 # http://localhost:3333
```

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
- [ ] La galería muestra las imágenes manuales cuando no hay token de Instagram.
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

### Crear el proyecto

1. `npm create sanity@latest` o desde <https://www.sanity.io/manage> → **Create project**.
2. Anota el **Project ID** y crea el dataset `production` (público es suficiente; si lo haces
   privado, genera un token de solo lectura → `SANITY_API_READ_TOKEN`).
3. Configura el Studio:
   ```bash
   cd studio
   npm install
   # PowerShell:  $env:SANITY_STUDIO_PROJECT_ID="xxxxx"
   # bash:        export SANITY_STUDIO_PROJECT_ID=xxxxx
   npm run dev
   ```
   (o crea `studio/.env` con `SANITY_STUDIO_PROJECT_ID=...`).
4. En el sitio, define `PUBLIC_SANITY_PROJECT_ID` (y demás `PUBLIC_SANITY_*`).

### Cargar el contenido inicial

```bash
npm run seed                      # genera seed/demo.ndjson (en la raíz)
cd studio
npx sanity dataset import ../seed/demo.ndjson production --replace
```

Esto crea los singletons y el contenido DEMO/real **sin imágenes** (se suben desde el Studio).

### Acceder / dar acceso

Studio → Manage (o <https://www.sanity.io/manage>) → **Members** → invitar por email. Los
editores entran con Google o email. Roles: `Editor` es suficiente para el día a día.

## Estructura del contenido administrable

**Singletons** (un único documento cada uno, en el menú «Contenido» del Studio):

| Documento                  | Contenido                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------- |
| ⚙️ Configuración del sitio | WhatsApp (número + mensaje), Instagram, **modo demostración**, logo, colores          |
| 🏔️ Home / Portada          | Título, subtítulo, CTAs, texto complementario, imagen de fondo                        |
| 👤 Quiénes somos           | Texto de Javier (**real**), cifra destacada, foto                                     |
| 📷 Galería (Instagram)     | Fuente (`instagram`/`manual`), nº de fotos, imágenes de respaldo                      |
| 📍 Ubicación               | Lugar, «dirección pendiente», dirección, mapa, enlace de navegación, nota de atención |
| ✨ CTA final               | Título, texto, botón, fondo                                                           |
| 🔻 Footer                  | Frase corta, enlaces legales (ocultos por defecto)                                    |
| 🔤 Títulos de secciones    | Título + intro de cada sección (y saludo del FAQ)                                     |

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

**Estado actual:** sin token configurado → la galería usa las **imágenes manuales** del CMS
(`Galería → Imágenes manuales`). El sitio funciona con normalidad.

### Activar la galería automática

Requiere que **@academyglider** sea cuenta **Business o Creator**.

1. <https://developers.facebook.com> → **Create App** → tipo _Business_.
2. Añade el producto **Instagram** → _Instagram API with Instagram Login_.
3. Permisos: `instagram_business_basic`. Añade la cuenta como _Instagram Tester_ y acéptala
   desde la app de Instagram (Configuración → Apps y sitios web).
4. Genera un **token de corta duración** y cámbialo por uno de **larga duración** (60 días).
   Guarda en Vercel:
   - `META_APP_ID`, `META_APP_SECRET`
   - `INSTAGRAM_USER_ID` (ID numérico)
   - `INSTAGRAM_LONG_LIVED_TOKEN`
   - `CRON_SECRET` (cualquier cadena larga)
5. `GET /api/instagram` empezará a devolver las publicaciones reales (cacheadas 1 h en el edge).

### Rotación del token

`vercel.json` programa `GET /api/cron/refresh-instagram-token` cada lunes. La Graph API
devuelve un token nuevo cada vez que se refresca (extiende otros 60 días). **Persistir el
token nuevo** requiere una de estas opciones (ver TODO en el archivo):

- **Recomendado:** usar la API de Vercel (`VERCEL_TOKEN` + `PATCH` de la env var) desde el cron.
- Alternativa: guardarlo en un documento de Sanity y leerlo desde `fetchInstagramMedia`.
  Mientras tanto, el cron mantiene vivo el token y registra el valor nuevo en los logs.

### Cambiar a un servicio gestionado

Si Meta endurece las políticas, se puede sustituir la fuente por Behold.so / EmbedSocial
tocando **solo** `src/lib/instagram.ts` (misma forma de `InstagramMediaItem`).

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

**Real** (confirmado por el cliente, ya cargado):

- Texto de **Quiénes somos** (Javier Martínez, +20 años). _La traducción al inglés es un
  borrador pendiente de revisión de Javier._
- WhatsApp `+56 9 5255 9138` y mensaje.
- Instagram `@academyglider`.
- Ubicación: **Geopark Vizcachaz** + nota «atención con agenda previa» (dirección exacta
  pendiente).
- Logo (`public/logo-academyglider.jpg`, usado sin modificar).

**DEMO** (ejemplos provisionales, marcados con `[CONTENIDO DEMO — REEMPLAZAR]` y badge):
Home, 2 cursos, 3 reseñas, categorías y preguntas de FAQ, CTA final, intros de secciones,
imágenes de `public/demo/*.svg`.

Un banner superior avisa a los visitantes mientras `demoMode` esté activo. Al reemplazar todo
el contenido real, desactiva `demoMode` y pon `isDemo = false` donde corresponda.

## Decisiones técnicas relevantes

- **Astro estático** en vez de Next.js: el sitio es casi todo contenido; menos JS, menos
  mantenimiento. Sólo `/api/*` se renderiza on-demand (adaptador Vercel).
- **Sin framework de UI para las islas:** la interactividad (menú, FAQ, galería, botón
  flotante) cabe en `<script>` vanilla; evita el peso de React/Preact.
- **Fallback DEMO local** (`demoContent.ts`): permite ver y desplegar el sitio antes de tener
  Sanity, y es la fuente del `seed`.
- **i18n a nivel de campo** (`{ es, en }`) en vez de documentos separados por idioma: más
  simple de editar para una sola persona.
- **Galería con doble fuente** (API + manual): cumple «sostenible, sin scraping».
- **Tipografías** (`Fraunces` + `Inter`, Google Fonts) y **paleta** (atardecer/cielo/montaña)
  son una propuesta inicial; ajustar al recibir la identidad de marca.

## Limitaciones conocidas

- Contenido DEMO visible (con aviso) hasta que se cargue el real.
- Galería automática inactiva hasta configurar la app de Meta y el token.
- La persistencia automática del token rotado de Instagram está pendiente (ver §Instagram).
- El logo es blanco sobre fondo negro (JPG). Falta una versión con **fondo transparente**
  (PNG/SVG) para superponerlo limpio sobre fotos.
- Sección Ubicación sin mapa hasta confirmar dirección/coordenadas.
- Traducciones EN de contenido real (Quiénes somos) pendientes de validación.
- `npm run preview` no ejecuta las rutas `/api`.

## Información que todavía falta

Para pasar de DEMO a real (ver también el plan de proyecto):

- **Ubicación:** dirección exacta / enlace de Google Maps / coordenadas de Geopark Vizcachaz;
  ¿se muestra la dirección o sólo «coordina por WhatsApp»?
- **Cursos reales:** nombres, descripciones, duración, precio (¿mostrar u ocultar?), requisitos,
  qué incluye, nivel, cupos. ¿Cuántos al lanzamiento?
- **Home:** título, subtítulo, CTA y texto definitivos (ES/EN); media del hero.
- **Quiénes somos:** ¿foto de Javier? ¿traducción EN propia o validar la borrador?
- **Reseñas reales.**
- **FAQ real:** categorías y preguntas/respuestas (ES/EN).
- **Marca:** logo transparente, paleta, tipografías, referencias visuales.
- **Legal:** razón social / RUT para el footer; política de privacidad (la exige Meta para la
  app de Instagram).
- **Dominio** deseado y quién lo registra.
- **Instagram:** acceso admin para crear la app y generar el token; confirmar Business/Creator.

## Troubleshooting

| Síntoma                                                | Causa / solución                                                                         |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| El build avisa «Node.js version (24) is not supported» | Usa Node 22 (`nvm use 22`). El build igual funciona.                                     |
| La galería muestra siempre las imágenes DEMO           | No hay `INSTAGRAM_*` configuradas o el token caducó. Revisa `/api/instagram` y los logs. |
| Cambié algo en Sanity y el sitio no cambia             | Falta el Deploy Hook (webhook Sanity → Vercel), o el deploy aún no terminó.              |
| «Cannot find name 'process'» en `astro check`          | `npm i -D @types/node@22`.                                                               |
| El Studio no abre / «projectId» inválido               | Falta `SANITY_STUDIO_PROJECT_ID` (o `studio/.env`).                                      |
| Estilos sin aplicar tras cambiar tokens                | Reinicia `npm run dev` (Tailwind v4 relee `@theme`).                                     |
| `npm run seed` falla                                   | Requiere Node ≥ 22.6 (strip de tipos).                                                   |
| Las funciones `/api` no responden en `npm run preview` | Es lo esperado; usa `npm run dev` o `vercel dev`.                                        |

## Credenciales y secretos

- **Nunca** se commitea `.env` ni tokens reales. `.env.example` documenta las claves sin valores.
- Secretos en producción: sólo en Vercel (Environment Variables) y en Sanity (Members / tokens).
- Rota `INSTAGRAM_LONG_LIVED_TOKEN`, `META_APP_SECRET` y cualquier token de Sanity si se filtran.
- El `CRON_SECRET` protege el endpoint de cron: Vercel lo envía como `Authorization: Bearer …`.

---

_Mantén este README actualizado ante cualquier cambio de arquitectura, configuración,
instalación, despliegue o CMS. Es parte del entregable._
