import { useEffect, useId } from "react";
import { MaterialIcon } from "../materialIcon/MaterialIcon";

// TODO: Llevar el tipado del item a un archivo aparte
export type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  title?: string;
};

type HSAccordionGlobal = {
  HSAccordion?: {
    autoInit: () => void;
  };
};

export const FaqAccordion = ({ items, title = "Preguntas frecuentes" }: FaqAccordionProps) => {
  const accordionId = useId();

  useEffect(() => {
    (window as unknown as HSAccordionGlobal).HSAccordion?.autoInit();
  }, []);

  return (
    <section aria-label={title}>
      <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
      <div className="accordion space-y-3">
        {items.map((item, index) => {
          const isOpen = index === 0;
          const itemId = `${accordionId}-item-${index}`;
          const contentId = `${accordionId}-content-${index}`;

          return (
            <div
              key={itemId}
              id={itemId}
              className={`accordion-item surface-panel overflow-hidden${isOpen ? " active" : ""}`}>
              <button
                type="button"
                className="accordion-toggle inline-flex items-center gap-x-4 text-start"
                aria-controls={contentId}
                aria-expanded={isOpen}>
                <MaterialIcon
                  icon="expand_more"
                  className="accordion-item-active:rotate-180 text-primary size-4.5 shrink-0 transition-transform duration-300"
                />
                <span className="text-base font-semibold">{item.question}</span>
              </button>
              <div
                id={contentId}
                className={`accordion-content w-full overflow-hidden transition-[height] duration-300${
                  isOpen ? "" : " hidden"
                }`}
                aria-labelledby={itemId}
                role="region">
                <div className="px-5 pb-4">
                  <p className="text-base-content/80 font-normal">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
