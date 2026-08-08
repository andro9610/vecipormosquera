import { ContactForm } from "./components/contactForm";
import { OtherContacts } from "./components/otherContacts";


export const ContactUs = () => {
  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="flex-1">
        <OtherContacts />
      </div>
      <div className="flex-1 mt-4 md:mt-0 md:ml-6">
        <ContactForm />
      </div>
    </div>
  );
};
