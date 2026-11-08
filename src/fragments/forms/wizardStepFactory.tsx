import type { ReactNode } from "react";
import type { ClaimantWithRole, PropertyInfo } from "../../types/toolsForms";
import type { SortableTextItem } from "../../types/sortableTextItem";
import type { WizardStep } from "../wizard/types/wizardStep";
import { AttachmentsEditor } from "./attachmentsEditor";
import { ClaimantInfoFields } from "./claimantInfoFields";
import { PreviousActField } from "./previousActField";
import { PropertyIdentifierFields } from "./propertyIdentifierFields";
import { SortableTextList } from "./sortableTextList";

const CLAIMANT_TITLE = "Información del solicitante";
const CLAIMANT_HELPER =
  "En las siguientes direcciones se notificara, comunicara o enviara la respuesta, se recomienda escribir bien las direcciones y asegurarse que sea una direccion reciente o que se revise frecuentemente.";
const PREVIOUS_ACT_TITLE = "Actuacion previa";
const PREVIOUS_ACT_HELPER = "Aqui puede indicar cual es la actuacion o documento que motiva la solicitud";
const SUMMARY_TITLE = "Resumen";
const SUMMARY_HELPER = "Revise la informacion registrada antes de generar el documento final.";
const SUMMARY_NEXT_LABEL = "Descargar documento y continuar";
const NEXT_STEPS_TITLE = "Siguientes pasos";

type ClaimantStepOptions = {
  value: ClaimantWithRole;
  onChangeField: (field: keyof ClaimantWithRole, value: string | boolean) => void;
  canContinue: boolean;
  showRole?: boolean;
  showDireccion?: boolean;
  direccionLabel?: string;
  helper?: string;
};

type PreviousActStepOptions = {
  value: string;
  onChange: (value: string) => void;
  suggestionForm: string;
  canContinue: boolean;
};

type PropertyStepOptions = {
  value: PropertyInfo;
  onChangeField: (field: keyof PropertyInfo, value: string) => void;
  canContinue: boolean;
  identifierLabel: string;
  numberLabel: string;
  showDireccion?: boolean;
  title?: string;
  helper?: string;
};

type TextListHandlers = {
  onAdd: (initialValue?: string) => void;
  onUpdate: (id: string, value: string) => void;
  onRemove: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
};

type FactsStepOptions = TextListHandlers & {
  items: SortableTextItem[];
  suggestionForm: string;
  canContinue: boolean;
};

type PeticionesStepOptions = FactsStepOptions;

type AttachmentsStepOptions = {
  attachmentNames: string[];
  onAttachmentsChange: (attachmentNames: string[]) => void;
  suggestionForm: string;
  helper: string;
};

type SummaryStepOptions = {
  content: ReactNode;
  canContinue: boolean;
  onNext: () => void | Promise<void>;
};

export const createClaimantStep = ({
  value,
  onChangeField,
  canContinue,
  showRole = false,
  showDireccion = true,
  direccionLabel,
  helper = CLAIMANT_HELPER,
}: ClaimantStepOptions): WizardStep => ({
  key: "solicitante",
  title: CLAIMANT_TITLE,
  helper,
  canContinue,
  content: (
    <ClaimantInfoFields
      value={value}
      onChangeField={onChangeField}
      showRole={showRole}
      showDireccion={showDireccion}
      direccionLabel={direccionLabel}
    />
  ),
});

export const createPreviousActStep = ({
  value,
  onChange,
  suggestionForm,
  canContinue,
}: PreviousActStepOptions): WizardStep => ({
  key: "actuacion",
  title: PREVIOUS_ACT_TITLE,
  helper: PREVIOUS_ACT_HELPER,
  canContinue,
  content: <PreviousActField value={value} onChange={onChange} suggestionForm={suggestionForm} />,
});

export const createPropertyStep = ({
  value,
  onChangeField,
  canContinue,
  identifierLabel,
  numberLabel,
  showDireccion = false,
  title = "Información del inmueble",
  helper = "",
}: PropertyStepOptions): WizardStep => ({
  key: "inmueble",
  title,
  helper,
  canContinue,
  content: (
    <PropertyIdentifierFields
      value={value}
      onChangeField={onChangeField}
      identifierLabel={identifierLabel}
      numberLabel={numberLabel}
      showDireccion={showDireccion}
    />
  ),
});

export const createFactsStep = ({
  items,
  suggestionForm,
  canContinue,
  ...handlers
}: FactsStepOptions): WizardStep => ({
  key: "hechos",
  title: "Hechos",
  helper:
    "Escribir los hechos en orden cronologico, del mas antiguo al mas reciente, y de manera clara para que cada uno sea entendible.",
  canContinue,
  content: (
    <SortableTextList
      items={items}
      suggestionForm={suggestionForm}
      suggestionSection="HECHOS"
      placeholder="Descripcion del hecho"
      addLabel="Agregar hecho"
      {...handlers}
    />
  ),
});

export const createPeticionesStep = ({
  items,
  suggestionForm,
  canContinue,
  ...handlers
}: PeticionesStepOptions): WizardStep => ({
  key: "peticiones",
  title: "Peticiones",
  helper:
    "Escribir las peticiones o preguntas de la manera mas clara posible, utilizando al inicio frases como se me informe, se me indique, o se me senale.",
  canContinue,
  content: (
    <SortableTextList
      items={items}
      suggestionForm={suggestionForm}
      suggestionSection="PRETENSIONES"
      placeholder="Descripcion de la peticion"
      addLabel="Agregar peticion"
      {...handlers}
    />
  ),
});

export const createAttachmentsStep = ({
  attachmentNames,
  onAttachmentsChange,
  suggestionForm,
  helper,
}: AttachmentsStepOptions): WizardStep => ({
  key: "anexos",
  title: "Anexos",
  helper,
  canContinue: true,
  content: (
    <AttachmentsEditor
      attachmentNames={attachmentNames}
      onAttachmentsChange={onAttachmentsChange}
      suggestionForm={suggestionForm}
    />
  ),
});

export const createSummaryStep = ({ content, canContinue, onNext }: SummaryStepOptions): WizardStep => ({
  key: "resumen",
  title: SUMMARY_TITLE,
  helper: SUMMARY_HELPER,
  nextLabel: SUMMARY_NEXT_LABEL,
  onNext,
  canContinue,
  content,
});

export const createNextStepsStep = (content: ReactNode): WizardStep => ({
  key: "siguientesPasos",
  title: NEXT_STEPS_TITLE,
  helper: "",
  canContinue: true,
  content,
});
