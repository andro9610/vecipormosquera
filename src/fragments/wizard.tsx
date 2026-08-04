import { useState, type ReactNode } from "react";
import { MaterialIcon } from "./MaterialIcon";

export type WizardStep = {
  key: string;
  title: string;
  helper: string;
  canContinue: boolean;
  content: ReactNode;
};

type WizardProps = {
  title: string;
  steps: WizardStep[];
  onFinish: () => void;
  finishLabel?: string;
};

export const Wizard = ({ title, steps, onFinish, finishLabel = "Finalizar" }: WizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (steps.length === 0) {
    return null;
  }

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const currentStepData = steps[currentStep];

  const goToPreviousStep = () => setCurrentStep((step) => Math.max(step - 1, 0));
  const goToNextStep = () => setCurrentStep((step) => Math.min(step + 1, steps.length - 1));

  return (
    <section className="surface-organic backdrop-blur md:p-8">
      <header className="divider-soft mb-6 flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/12 text-primary">
            <MaterialIcon icon="search_insights" weight={600} opticalSize={30} label="Formulario de solicitud" />
          </span>
          <div>
            <h4 className="text-2xl leading-tight text-base-content sm:text-3xl">{title}</h4>
          </div>
        </div>
      </header>

      <section
        className="surface-panel overflow-hidden rounded-2xl border border-base-200/60 bg-base-100 shadow-sm"
        data-stepper={`{"currentIndex": ${currentStep + 1}, "mode": "non-linear"}`}>
        <div className="border-b border-base-200/60 p-4 md:p-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
                {currentStep + 1}
              </span>
              <div className="min-w-0">
                <span className="block text-[13px] uppercase tracking-[0.15em] text-base-content/55">
                  Paso {currentStep + 1} de {steps.length}
                </span>
                <span className="mt-0.5 flex items-center gap-2 text-base font-semibold">{currentStepData.title}</span>
              </div>
            </div>
            <p className="text-justify text-sm text-base-content/80">{currentStepData.helper}</p>
          </div>
        </div>

        <div className="p-4 md:p-5">
          {currentStepData.content}

          <div className="divider-soft mt-6 flex flex-wrap justify-end gap-3 border-t pt-5">
            <div className="flex flex-wrap justify-end gap-3">
              {!isFirstStep && (
                <button className="btn btn-secondary py-5" type="button" onClick={goToPreviousStep}>
                  <MaterialIcon icon="chevron_left" opticalSize={20} className="mr-1" aria-hidden="true" />
                  Anterior
                </button>
              )}
              {!isLastStep && (
                <button
                  className="btn btn-primary py-5"
                  type="button"
                  onClick={goToNextStep}
                  disabled={!currentStepData.canContinue}>
                  <MaterialIcon icon="chevron_right" opticalSize={20} className="mr-1" aria-hidden="true" />
                  Siguiente
                </button>
              )}
              {isLastStep && (
                <button
                  className="btn btn-neutral py-5"
                  type="button"
                  onClick={onFinish}
                  disabled={!currentStepData.canContinue}>
                  <MaterialIcon icon="file_save" opticalSize={20} className="mr-1" aria-hidden="true" />
                  {finishLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
