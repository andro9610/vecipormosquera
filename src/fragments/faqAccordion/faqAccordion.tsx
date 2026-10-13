import { useState } from "react";
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

export const FaqAccordion = ({ items, title = "Preguntas frecuentes" }: FaqAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-label={title}>
      <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
      <div className="accordion space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const questionId = `faq-question-${index}`;
          const contentId = `faq-content-${index}`;

          return (
            <div
              key={questionId}
              className={`accordion-item --prevent-on-load-init surface-panel overflow-hidden${
                isOpen ? " active" : ""
              }`}>
              <button
                type="button"
                id={questionId}
                className="accordion-toggle flex w-full items-center gap-x-4 text-start"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => setOpenIndex((current) => (current === index ? null : index))}>
                <MaterialIcon
                  icon="expand_more"
                  className={`text-primary size-4.5 shrink-0 transition-transform duration-300${
                    isOpen ? " rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
                <span className="text-base font-semibold">{item.question}</span>
              </button>
              <div
                id={contentId}
                className={`accordion-content grid w-full transition-[grid-template-rows] duration-300 ease-out${
                  isOpen ? " grid-rows-[1fr]" : " grid-rows-[0fr]"
                }`}
                role="region"
                aria-labelledby={questionId}>
                <div className="overflow-hidden">
                  <div className="px-5 pb-4">
                    <p className="text-base-content/80 font-normal">{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
