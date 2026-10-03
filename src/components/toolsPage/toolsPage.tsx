import { Link } from "react-router-dom";
import { MaterialIcon } from "../../fragments/materialIcon/MaterialIcon";
import { FaqAccordion } from "../../fragments/faqAccordion/faqAccordion";
import { useCounters } from "../../hooks/useCounters";
type SelectionOption = {
  title: string;
  description: string;
  path: string;
  icon: string;
  actionText?: string;
  counterName: string;
};

const options: SelectionOption[] = [
  {
    title: "SOLICITUD DE EXPEDICION DE IMPUESTO PREDIAL",
    description: "En caso de que no hayan expedido su recibo del impuesto predial se debe registrar una solicitud formal",
    path: "solicitudExpedicionPredial",
    icon: "receipt_long",
    counterName: "SOLICITUD_EXPEDICION_PREDIAL",
  },
  {
    title: "SOLICITUD DE REVISIÓN DE AVALUO CATASTRAL",
    description: "En caso de presentar alguna inconsistencia en relación al avaluo catastral o información del predio.",
    path: "solicitudRevisionCatastral",
    icon: "map_search",
    counterName: "SOLICITUD_REVISION",
  },
  {
    title: "RECURSO DE RECONSIDERACIÓN DE IMPUESTO PREDIAL",
    description: "En caso de que exista alguna anomalia en la facturación del impuesto predial, descuentos, conceptos y plazos de pago.",
    path: "solicitudReconsideracionPredial",
    icon: "autorenew",
    counterName: "RECURSO_RECONSIDERACION",
  },
];

type Question = {
  question: string;
  answer: string;
};
// TODO : Llevar las preguntas frecuentes a la base de datos
const questions: Question[] = [
  {
    question: "¿Debo pagar mi impuesto predial para presentar mi recurso de reconsideración?", 
    answer: "No, Recuerda que el recurso tiene efecto suspensivo. Sin embargo se recomienda realizar el pago si tienes los medios para hacerlo"},
]

export const ToolsPage = () => {
  const { counters } = useCounters(options.map((option) => option.counterName));

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6">
      <h1 className="text-2xl font-semibold md:text-3xl">AVALUO CATASTRAL E IMPUESTO PREDIAL</h1>
      <p className="mt-2 text-sm text-base-content/80 md:text-base">
        Haga clic para iniciar el formulario correspondiente.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {options.map((option) => (
          <Link
            key={option.path}
            to={option.path}
            className="surface-panel group grid h-full grid-cols-[auto_1fr] grid-rows-[1fr_auto] gap-x-3 gap-y-4 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45">
            <span className="material-symbols-outlined self-start text-3xl text-primary transition-transform duration-200 group-hover:scale-110">
              {option.icon}
            </span>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold leading-tight md:text-xl">{option.title}</h2>
              <p className="mt-2 text-sm text-base-content/80 md:text-base">{option.description}</p>
            </div>
            <div className="col-start-2 space-y-3">
              <span className="inline-flex items-center text-sm font-medium text-primary">
                {option.actionText ?? "Diligenciar"}
                <MaterialIcon icon="chevron_right" className="ml-1 text-base" />
              </span>
              <div className="flex items-center gap-2 border-l-2 border-primary/30 pl-3">
                <span className="text-3xl font-bold leading-none text-primary">{counters[option.counterName] ?? 0}</span>
                <span className="text-xs uppercase tracking-wide text-base-content/60">Documentos generados</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="pt-5">
        <FaqAccordion items={questions} />
      </div>
    </section>
  );
};
