import { ContactForm } from "./components/contactForm";
import { OtherContacts } from "./components/otherContacts";


export const ContactUs = () => {
  return (
    <div className="flex w-full">
      <div className="flex-1">
        <OtherContacts />
      </div>
      <div className="flex-1">
        <ContactForm />
      </div>
    </div>
  );
};
