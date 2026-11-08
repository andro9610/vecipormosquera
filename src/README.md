# Veeduría Ciudadana por el Pueblo de Mosquera — Arquitectura de `src/`

Aplicación web de la Veeduría Ciudadana por el Pueblo de Mosquera. Expone información institucional,
un catálogo de cursos de formación ciudadana y tres herramientas que generan documentos `.docx` para
trámites de catastro e impuesto predial.

Stack: React 19 + TypeScript + Vite, React Router, TanStack Query, Supabase, Tailwind/FlyonUI,
`jszip` y `docx-templates` para la generación de documentos.

```bash
pnpm install
pnpm dev      # http://localhost:5174
pnpm build    # tsc -b + vite build
```

> `pnpm lint` no se puede ejecutar con el toolchain actual: `typescript-eslint@8` no soporta
> TypeScript 7.0 (falla al cargar el parser). La verificación de tipos se hace con `pnpm build`.

## Variables de entorno

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Copia `.env.example` a `.env.local` y completa los valores del proyecto. Sin estas variables el
cliente de Supabase lanza un error explícito al iniciar.

## Reglas de ubicación

| Carpeta | Contenido | Regla |
|---|---|---|
| `components/` | Páginas y sus piezas exclusivas | Una carpeta por página; anidación de páginas = anidación de carpetas |
| `fragments/` | Componentes reutilizables sin lógica de negocio | Incluye `fragments/forms/`, piezas compartidas por los formularios |
| `hooks/` | **Solo** hooks con estado o efectos de React | Una función pura nunca vive aquí |
| `utilities/` | Funciones puras sin React | Fechas, ids, texto, documentos |
| `services/` | Acceso a datos externos | Cliente de Supabase y consultas; sin React |
| `const/` | Constantes grandes del aplicativo | `const/const.ts` centraliza `WHATSAPP_NUMBER` |
| `types/` | Tipos transversales del sistema | Incluye `Database` e `ImportMetaEnv`; los tipos de una feature viven en su carpeta |
| `layout/` | Marco visual: navbar, tema, drawer de contacto | Se monta una vez por ruta |
| `routes/` | Definición de rutas y composición de providers | Sin lógica de negocio |
| `docs/` | Plantillas `.docx` y `.pdf` que consumen los formularios | Empaquetadas por Vite con `?url` |

## Patrones aplicados

| Patrón / principio | Dónde |
|---|---|
| **Factory Method** | `fragments/forms/context/createWizardContext.tsx` crea el par provider/hook de cada formulario; `fragments/forms/wizardStepFactory.tsx` fabrica los pasos del wizard |
| **Strategy + Registry** | `utilities/documents/strategies.ts` registra una estrategia de generación por tipo de documento (`revision`, `reconsideracion`, `expedicion`) |
| **Facade** | `utilities/documents/generateDocument.ts` oculta JSZip, `docx-templates`, descarga y contador |
| **Adapter** | `services/suggestionsService.ts` y `services/countersService.ts` adaptan Supabase al contrato que consumen los hooks |
| **Template Method** | Builders de `wizardStepFactory.tsx` fijan el esqueleto de cada paso y parametrizan contenido y validación |
| **DRY** | `claimantInfoFields`, `sortableTextList`, `attachmentsEditor`, `summaryPanel`, `validationUtilities`, `textUtilities` |
| **Open/Closed** | Un formulario nuevo solo registra su reducer, su contexto y sus estrategias; no modifica los existentes |

Flujo de un formulario:

```
ruta (routesComponent) -> Provider del formulario (createWizardContext)
   -> revisionForm | reconsiderationForm | expeditionForm
      -> wizardStepFactory (compone pasos con fragments/forms/*)
         -> Wizard (fragments/wizard)
      -> generateDocument(kind, state) -> strategies + templateUtilities + countersService
```

---

# Índice de archivos

## Raíz

| Archivo | Responsabilidad |
|---|---|
| `App.tsx` | Monta las rutas y el `ToastContainer` global. |
| `main.tsx` | Punto de entrada: `QueryClientProvider`, `BrowserRouter` con `basename`, tema inicial y normalización de URL. |
| `styles.css` | Tailwind, FlyonUI, tokens de tema y utilidades (`surface-panel`, `control-organic`, etc.). |

## `const/`

| Archivo | Responsabilidad |
|---|---|
| `const.ts` | `WHATSAPP_NUMBER`: número de contacto usado por los formularios de contacto y únete. |

## `components/`

### `components/bylaws/`

| Archivo | Responsabilidad |
|---|---|
| `bylaws.tsx` | Página de estatutos; muestra el PDF con `PdfViewer` y la fecha de actualización. |

### `components/contactUs/`

| Archivo | Responsabilidad |
|---|---|
| `contactUs.tsx` | `ContactDrawer`: panel lateral de contacto con overlay y cierre accesible. |
| `components/otherContacts.tsx` | Logo y redes sociales; arma URLs con `buildAssetUrl`. |
| `components/contactForm/contactForm.tsx` | Formulario de mensaje (nombre y mensaje) enviado por WhatsApp. |
| `components/contactForm/hooks/useContactForm.ts` | Estado del formulario y apertura de WhatsApp con `openWhatsApp`. |

### `components/home/`

| Archivo | Responsabilidad |
|---|---|
| `home.tsx` | Página de inicio: carrusel de hitos con autoplay/pausa, aliados, integrantes y modal de inscripción. |
| `const/timelineItems.tsx` | Datos de los hitos de la organización (`TimelineItemProps[]`), incluido el enlace a estatutos. |
| `components/hero/heroTimelineMobile.tsx` | Acordeón de hitos en móvil. |
| `components/hero/heroTimelineDesktop.tsx` | Lista de hitos y contenido del hito activo en escritorio. |
| `components/joinUsModal.tsx` | Modal de "Únete a nosotros". |
| `components/joinUsForm/joinUsForm.tsx` | Formulario de nombre para unirse a la veeduría. |
| `components/joinUsForm/hooks/useJoinUsTools.ts` | Abre WhatsApp con `WHATSAPP_NUMBER` a partir del nombre ingresado. |
| `components/members/members.tsx` | Grilla de integrantes con estado de carga y error. |
| `components/members/components/memberSkeleton.tsx` | Esqueleto de carga de integrantes. |
| `components/members/hooks/useMembers.ts` | Lista de integrantes (semilla estática lista para backend). |
| `components/members/types/member.ts` | Tipo `Member`. |
| `components/partners/partners.tsx` | Franja de organizaciones aliadas. |
| `components/partners/components/partnerRef.tsx` | Logo y enlace de un aliado. |
| `components/partners/components/partnerSkeleton.tsx` | Esqueleto de carga de aliados. |
| `components/partners/hooks/usePartners.ts` | Lista de aliados (semilla estática lista para backend). |
| `components/partners/types/partner.ts` | Tipo `Partner`. |

### `components/home/components/organizationTimeline/`

| Archivo | Responsabilidad |
|---|---|
| `organizationTimeLine.tsx` | Vista de línea de tiempo con filtro por etiqueta; reutiliza `fragments/timeline`. |
| `components/timelineFilter/timelineFilter.tsx` | Chips de filtrado por etiqueta. |
| `components/timelineFilter/hooks/useTimelineFilterTools.ts` | Etiquetas disponibles y elementos filtrados. |

### `components/learn/`

| Archivo | Responsabilidad |
|---|---|
| `learn.tsx` | Catálogo de cursos con totales, carga, error y estado vacío. |
| `components/courseCard.tsx` | Tarjeta de curso con miniatura de YouTube y métricas. |
| `components/courseFeedback.tsx` | Panel reutilizable de error / vacío para el módulo. |
| `components/courseListSkeleton.tsx` | Esqueleto del catálogo. |
| `components/sectionHeading.tsx` | Encabezado de sección con icono y contenido a la derecha. |
| `const/courses.ts` | Semilla de cursos, módulos y clases. |
| `courseDetail/courseDetail.tsx` | Página de detalle: resuelve el curso por slug y delega en `CourseContent`. |
| `courseDetail/components/courseContent.tsx` | Layout del curso: miga de pan, encabezado, reproductor y contenido. |
| `courseDetail/components/courseDetailSkeleton.tsx` | Esqueleto del detalle. |
| `courseDetail/components/lessonListItem.tsx` | Elemento de clase en la lista del módulo. |
| `courseDetail/components/lessonPlayer.tsx` | Reproductor embebido de YouTube con navegación anterior/siguiente. |
| `courseDetail/components/moduleAccordion.tsx` | Acordeón de módulos con sus clases. |
| `courseDetail/hooks/useCourseNavigation.ts` | Clase activa, módulos abiertos y navegación secuencial. |
| `hooks/useCourses.ts` | Consulta del catálogo y `useCourse(slug)`. |
| `types/course.ts` | Tipos `Lesson`, `CourseModule`, `Course`, `CourseLesson`. |
| `utilities/courseStats.ts` | Aplana clases y calcula métricas/miniatura del curso. |

### `components/toolsPage/`

| Archivo | Responsabilidad |
|---|---|
| `toolsPage.tsx` | Página de herramientas: tarjetas de trámite con contadores y FAQ. |
| `const/const.ts` | `DEFAULT_MUNICIPIO`, claves de sugerencias (`SUGGESTION_FORMS`) y `NO_REGISTRA`. |

#### `toolsPage/revisionForm/`

| Archivo | Responsabilidad |
|---|---|
| `revisionForm.tsx` | Wizard de revisión de avalúo; compone pasos, valida y dispara el documento. Soporta `isBackdoor` (paso de municipio y sin contador). |
| `components/municipioInfo.tsx` | Campos del municipio y del gestor catastral (solo flujo backdoor). |
| `context/requirementsContext.tsx` | Provider y hook del formulario creados con `createWizardContext`. |
| `states/requirementsReducer.ts` | Estado inicial y reducer delgado del formulario. |

#### `toolsPage/reconsiderationForm/`

| Archivo | Responsabilidad |
|---|---|
| `reconsiderationForm.tsx` | Wizard del recurso de reconsideración; incluye calculadora de términos y control de fecha límite. |
| `components/termsCalculator.tsx` | Input de fecha de expedición con calendario. |
| `components/termsCalculator/useTermsCalculator.ts` | Integra flatpickr, sincroniza el valor y avisa si el plazo venció. |
| `context/reconsiderationContext.tsx` | Provider y hook del formulario. |
| `states/reconsiderationReducer.ts` | Estado inicial y reducer delgado. |

#### `toolsPage/expeditionForm/`

| Archivo | Responsabilidad |
|---|---|
| `expeditionForm.tsx` | Wizard de solicitud de expedición de impuesto predial. |
| `context/expeditionContext.tsx` | Provider y hook del formulario. |
| `states/expeditionReducer.ts` | Estado inicial y reducer delgado. |

### `components/pageInProgress/`

| Archivo | Responsabilidad |
|---|---|
| `pageInProgress.tsx` | Página de mantenimiento/"en construcción" para desarrollo y caídas controladas. |

## `fragments/`

| Archivo | Responsabilidad |
|---|---|
| `forms/claimantInfoFields.tsx` | Campos del solicitante compartidos por los 3 formularios (`showRole`, `showDireccion`). |
| `forms/propertyIdentifierFields.tsx` | Tipo de identificador del predio y número, con dirección opcional. |
| `forms/previousActField.tsx` | Actuación previa con sugerencias de Supabase. |
| `forms/sortableTextList.tsx` | Lista de textos ordenable con sugerencias; cubre hechos y peticiones. |
| `forms/attachmentsEditor.tsx` | Anexos: alta manual, sugerencias, listado y borrado. |
| `forms/summaryPanel.tsx` | `SummaryPanel`, `SummarySection` y `SummaryNotice` para los resúmenes. |
| `forms/wizardStepFactory.tsx` | Builders de pasos: solicitante, actuación, predio, hechos, peticiones, anexos, resumen y siguientes pasos. |
| `forms/context/createWizardContext.tsx` | Factory de provider + hook tipados para cada formulario. |
| `forms/hooks/useAttachments.ts` | Estado y operaciones de la lista de anexos. |
| `faqAccordion/faqAccordion.tsx` | Acordeón accesible de preguntas frecuentes. |
| `materialIcon/MaterialIcon.tsx` | Icono de Material Symbols con variante, peso, relleno y tamaño óptico. |
| `note/note.tsx` | Nota informativa/advetencia con icono. |
| `pdfViewer/PdfViewer.tsx` | Visor PDF basado en pdf.js con paginación. |
| `sortableTextAreaItem/sortableTextAreaItem.tsx` | Textarea arrastrable con borrado y sugerencias. |
| `sortableTextAreaItem/hooks/useSortableTextAreaItemUtilities.ts` | Sensores de dnd-kit y traducción del evento de arrastre a `onReorder`. |
| `status/errorMessage.tsx` | Mensaje de error reutilizable para listados. |
| `suggestionsChips/suggestionsChips.tsx` | Chips de sugerencias con estados de carga y error. |
| `timeline/timeline.tsx` | Lista de línea de tiempo. |
| `timeline/timelineItem.tsx` | Hito de la línea de tiempo (fecha formateada, etiqueta y contenido). |
| `timeline/const/variantToClases.ts` | Clases por variante del hito. |
| `timeline/types/variant.ts` | Tipo `Variant`. |
| `wizard/wizard.tsx` | Motor de pasos: navegación, bloqueo por validación, estado ocupado y finalización. |
| `wizard/types/wizardStep.ts` | Tipo `WizardStep`. |

## `hooks/`

| Archivo | Responsabilidad |
|---|---|
| `useCounters.ts` | Lee contadores de documentos generados con `useQueries`. |
| `useGetSuggestions.ts` | Consulta sugerencias por formulario y sección. |
| `useTheme.ts` | Tema claro/oscuro con persistencia y preferencia del sistema. |

## `layout/`

| Archivo | Responsabilidad |
|---|---|
| `layout.tsx` | Marco general: navbar, contenedor de página y drawer de contacto. |
| `navbar.tsx` | Navegación principal, menú móvil, toggle de tema y botón de contacto. |
| `components/themeToggle.tsx` | Botón de cambio de tema. |
| `const/navBarRoutes.ts` | Rutas del menú (`NavBarRoute[]`). |
| `hooks/useDropdownMenu.ts` | Estado de apertura del menú móvil. |

## `routes/`

| Archivo | Responsabilidad |
|---|---|
| `routesComponent.tsx` | Árbol de rutas: inicio, herramientas y sus 3 formularios, `backdoor`, cursos y estatutos; envuelve cada formulario con su provider. |

## `services/`

| Archivo | Responsabilidad |
|---|---|
| `supabaseClient.ts` | Crea el cliente tipado de Supabase y valida `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`. |
| `suggestionsService.ts` | `fetchSuggestions`: resuelve `forms` → `form_sections` → `form_suggestions` y devuelve `{ alias, text }`. |
| `countersService.ts` | `fetchCounter` e `incrementCounter` sobre `counters` por lectura y escritura. |
| `keys.ts` | `toDbKey`: normaliza `form_name`, `section_name` y `counter_name` a minúsculas para coincidir con la base de datos. |

## `types/`

| Archivo | Responsabilidad |
|---|---|
| `toolsForms.ts` | Contratos de los formularios (`ClaimantInfo`, `ClaimantWithRole`, `PropertyIdentifier`, `PropertyInfo`, `MunicipioInfo`), estados y acciones de los 3 reducers. |
| `sortableTextItem.ts` | `SortableTextItem` (`id` + `value`). |
| `docxTemplates.d.ts` | Declaración de tipos para `docx-templates/lib/browser.js`. |
| `env.d.ts` | Tipado de `ImportMetaEnv` con las variables `VITE_SUPABASE_*`. |
| `database.types.ts` | Tipo `Database` con las tablas `forms`, `form_sections`, `form_suggestions` y `counters`. |

## `utilities/`

| Archivo | Responsabilidad |
|---|---|
| `assetUtilities.ts` | `buildAssetUrl` para resolver assets de `public/` con el `BASE_URL`. |
| `dateUtilities.ts` | Formato `es-CO`, validación de plazo de dos meses y suma de meses sobre `dd/mm/yyyy`. |
| `notificationUtilities.ts` | `notify` sobre react-toastify con estilos por variante. |
| `numberedListUtilities.ts` | Listas numeradas y escape de texto para Word. |
| `textAreaUtilities.ts` | Ids, alta/baja/edición/reorden de listas y actualización de campos de un objeto. |
| `textUtilities.ts` | `pluralize` y `buildSupportsText` para los resúmenes. |
| `validationUtilities.ts` | `isFilled`, `areFieldsFilled`, `hasFilledItems`. |
| `whatsappUtilities.ts` | Normaliza teléfonos y abre WhatsApp con mensaje. |
| `youtube.ts` | Extrae el id de video y construye URLs de embed y miniatura. |
| `documents/generateDocument.ts` | Orquesta la generación: estrategia, plantilla, descarga y contador. |
| `documents/strategies.ts` | Estrategias por tipo de documento y mapas de marcadores de las plantillas. |
| `documents/templateUtilities.ts` | Reemplazo de marcadores en el `.docx`, render con `docx-templates` y descarga del blob. |

## `docs/`

| Archivo | Uso |
|---|---|
| `Solicitud_Revision.docx` | Plantilla del formulario de revisión. |
| `Recurso_Reconsideracion.docx` | Plantilla del recurso de reconsideración. |
| `Solicitud_Expedicion_Predial.docx` | Plantilla de expedición de impuesto predial. |
| `Estatutos.pdf` | Documento mostrado en la página de estatutos. |

---

## Deuda técnica conocida

- `fragments/pdfViewer/PdfViewer.tsx` carga pdf.js desde CDN y usa `any`; candidato a reescritura con un wrapper tipado.
- `fragments/faqAccordion/faqAccordion.tsx` declara `FaqItem` en el propio archivo.
- Las semillas de cursos, integrantes y aliados están en código y quedan pendientes de migrar a Supabase.
- `WHATSAPP_NUMBER` está estático en `const/const.ts` hasta su migración a base de datos.
- El incremento de `counters` se hace con lectura y escritura desde el cliente; una RPC atómica queda como mejora pendiente.
- `pnpm lint` requiere actualizar `eslint`/`typescript-eslint` a versiones compatibles con TypeScript 7.
