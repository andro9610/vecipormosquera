import { MaterialIcon } from "../../fragments/materialIcon/MaterialIcon";
import { ContactForm } from "./components/contactForm/contactForm";
import { OtherContacts } from "./components/otherContacts";

type ContactDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ContactDrawer = ({ isOpen, onClose }: ContactDrawerProps) => {
  return (
    <div className={`fixed inset-0 z-50${isOpen ? "" : " pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300${
          isOpen ? " opacity-100" : " opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        id="contact-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Contacto"
        className={`absolute inset-y-0 inset-e-0 w-full max-w-md overflow-y-auto border-s border-base-content/10 bg-base-100 shadow-2xl transition-transform duration-300${
          isOpen ? " translate-x-0" : " translate-x-full"
        }`}>
        <div className="drawer-header relative">
          <div className="flex flex-col gap-0.5">
            <span className="label-text text-xs font-semibold text-primary">Contacto</span>
            <h2 className="drawer-title text-lg">Hablemos</h2>
          </div>
          <button
            type="button"
            className="absolute inset-e-3 top-3 inline-flex size-9 items-center justify-center rounded-full text-base-content/70 transition hover:bg-base-content/10 hover:text-base-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label="Cerrar"
            onClick={onClose}>
            <MaterialIcon icon="close" />
          </button>
        </div>

        <div className="drawer-body flex flex-col gap-6">
          <OtherContacts />
          <div className="border-t divider-soft" />
          <ContactForm />
        </div>
      </aside>
    </div>
  );
};
