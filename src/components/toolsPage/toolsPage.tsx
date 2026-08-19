import { Link } from "react-router-dom";
import { MaterialIcon } from "../../fragments/materialIcon/MaterialIcon";
type SelectionOption = {
  title: string;
  description: string;
  path: string;
  icon: string;
  actionText?: string;
};

const options: SelectionOption[] = [
  {
    title: "SOLICITUD DE EXPEDICION DE IMPUESTO PREDIAL",
    description: "En caso de que no hayan expedido su recibo del impuesto predial se debe registrar una solicitud formal",
    path: "solicitudExpedicionPredial",
    icon: "receipt_long",
  },
  {
    title: "SOLICITUD DE REVISIÓN DE AVALUO CATASTRAL",
    description: "En caso de presentar alguna inconsistencia en relación al avaluo catastral o información del predio.",
    path: "solicitudRevisionCatastral",
    icon: "map_search",
  },
  {
    title: "RECURSO DE RECONSIDERACIÓN DE IMPUESTO PREDIAL",
    description: "En caso de que exista alguna anomalia en la facturación del impuesto predial, descuentos, conceptos y plazos de pago.",
    path: "solicitudReconsideracionPredial",
    icon: "autorenew",
  },
];

export const ToolsPage = () => {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-6">
      <h1 className="text-2xl font-semibold md:text-3xl">AVALUO CATASTRAL E IMPUESTO PREDIAL</h1>
      <p className="mt-2 text-sm text-base-content/80 md:text-base">
        Haga clic para iniciar el formulario correspondiente.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {options.map((option) => (
          <Link
            key={option.path}
            to={option.path}
            className="surface-panel group block p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-3xl text-primary transition-transform duration-200 group-hover:scale-110">
                {option.icon}
              </span>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold leading-tight md:text-xl">{option.title}</h2>
                <p className="text-sm text-base-content/80 md:text-base">{option.description}</p>
                <span className="inline-flex items-center text-sm font-medium text-primary">
                  {option.actionText ?? "Diligenciar"}
                  <MaterialIcon icon="chevron_right" className="ml-1 text-base" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
