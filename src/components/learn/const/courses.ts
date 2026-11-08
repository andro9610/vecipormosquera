import type { Course } from "../types/course";

export const coursesSeed: Course[] = [
  {
    id: "course-avaluo-predial",
    slug: "avaluo-catastral-e-impuesto-predial",
    title: "Avalúo catastral e impuesto predial",
    description:
      "Aprende cómo se determina el avalúo catastral, cómo se liquida el impuesto predial y qué rutas existen para reclamar cuando detectas inconsistencias en tu predio.",
    icon: "apartment",
    level: "Fundamentos",
    modules: [
      {
        id: "module-fundamentos-catastro",
        title: "Fundamentos del catastro",
        description: "Conceptos esenciales para comprender la información predial y el avalúo catastral.",
        lessons: [
          {
            id: "lesson-que-es-catastro",
            title: "¿Qué es el catastro y para qué sirve?",
            description:
              "Conoce qué es el catastro, qué información administra y cómo incide en los trámites y obligaciones asociados a tu predio.",
            videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
            duration: "08:24",
          },
          {
            id: "lesson-avaluo-catastral",
            title: "Cómo se construye el avalúo catastral",
            description:
              "Revisa los componentes que intervienen en el cálculo del avalúo catastral y las variables físicas y jurídicas que se tienen en cuenta.",
            videoUrl: "https://youtu.be/ysz5S6PUM-U",
            duration: "11:05",
          },
        ],
      },
      {
        id: "module-impuesto-predial",
        title: "Impuesto predial en Mosquera",
        description: "Liquidación del tributo y alternativas para corregir o controvertir la facturación.",
        lessons: [
          {
            id: "lesson-liquidacion-predial",
            title: "Liquidación y conceptos del impuesto predial",
            description:
              "Identifica las variables que determinan el impuesto predial, los descuentos aplicables y la forma de interpretar tu factura.",
            videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
            duration: "09:38",
          },
          {
            id: "lesson-rutas-reclamacion",
            title: "Revisión, reclamación y recursos",
            description:
              "Conoce las diferencias entre una solicitud de revisión, una reclamación y los recursos disponibles para controvertir un acto de la administración.",
            videoUrl: "https://www.youtube.com/shorts/M7lc1UVf-VE",
            duration: "14:12",
          },
        ],
      },
    ],
  },
  {
    id: "course-veeduria-ciudadana",
    slug: "participacion-ciudadana-y-veeduria",
    title: "Participación ciudadana y veeduría",
    description:
      "Herramientas para ejercer control social, realizar seguimiento a la gestión pública y presentar solicitudes formales ante las entidades del municipio.",
    icon: "groups",
    level: "Participación",
    modules: [
      {
        id: "module-mecanismos-participacion",
        title: "Mecanismos de participación",
        description: "Escenarios y herramientas disponibles para la ciudadanía.",
        lessons: [
          {
            id: "lesson-que-es-veeduria",
            title: "¿Qué es una veeduría ciudadana?",
            description:
              "Descubre el alcance de una veeduría, sus objetivos y el papel que cumple en el seguimiento de los recursos públicos.",
            videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
            duration: "07:15",
          },
          {
            id: "lesson-seguimiento-gestion",
            title: "Cómo hacer seguimiento a la gestión pública",
            description:
              "Aprende a recopilar información, definir indicadores y documentar hallazgos durante un ejercicio de control social.",
            videoUrl: "https://youtu.be/ysz5S6PUM-U",
            duration: "10:47",
          },
        ],
      },
      {
        id: "module-derechos-veedor",
        title: "Derechos y deberes del veedor",
        description: "Marco práctico para actuar de manera responsable y efectiva.",
        lessons: [
          {
            id: "lesson-derechos-deberes",
            title: "Derechos y deberes del veedor ciudadano",
            description:
              "Conoce las garantías que protegen la labor de veeduría y las responsabilidades que deben asumirse durante el ejercicio.",
            videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
            duration: "12:03",
          },
          {
            id: "lesson-derecho-peticion",
            title: "Cómo presentar un derecho de petición",
            description:
              "Revisa la estructura de una solicitud, los plazos de respuesta y las recomendaciones para realizar un seguimiento adecuado.",
            videoUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
            duration: "13:29",
          },
        ],
      },
    ],
  },
  {
    id: "course-tramites-y-servicios",
    slug: "tramites-y-servicios-municipales",
    title: "Trámites y servicios municipales",
    description:
      "Guía práctica para identificar los trámites disponibles, preparar los documentos requeridos y realizar seguimiento a tus solicitudes ante el municipio.",
    icon: "description",
    level: "Trámites",
    modules: [
      {
        id: "module-ruta-tramites",
        title: "Ruta de los trámites",
        description: "Pasos, requisitos y canales para radicar solicitudes correctamente.",
        lessons: [
          {
            id: "lesson-identificar-tramite",
            title: "Cómo identificar el trámite que necesitas",
            description:
              "Aprende a reconocer el trámite adecuado según tu necesidad y a consultar los requisitos vigentes antes de radicar.",
            videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
            duration: "06:52",
          },
          {
            id: "lesson-preparar-documentos",
            title: "Preparación de documentos y anexos",
            description:
              "Revisa cómo organizar los soportes, verificar los requisitos y evitar devoluciones por información incompleta.",
            videoUrl: "https://youtu.be/ysz5S6PUM-U",
            duration: "09:14",
          },
        ],
      },
      {
        id: "module-seguimiento-solicitudes",
        title: "Seguimiento de solicitudes",
        description: "Consulta de estados, plazos y canales de atención.",
        lessons: [
          {
            id: "lesson-radicar-solicitud",
            title: "Radicación y canales de atención",
            description:
              "Conoce los canales disponibles para radicar, los números de radicado y la forma de consultar el estado de tu solicitud.",
            videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
            duration: "08:31",
          },
          {
            id: "lesson-respuesta-entidad",
            title: "Qué hacer con la respuesta de la entidad",
            description:
              "Interpreta la respuesta oficial, identifica los recursos procedentes y los plazos para actuar.",
            videoUrl: "https://www.youtube.com/shorts/M7lc1UVf-VE",
            duration: "11:26",
          },
        ],
      },
    ],
  },
];
