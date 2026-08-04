import { JoinUsBanner } from "./components/joinUsBanner";
import { Members } from "./components/members";
import { Partners } from "./components/partners";

export const AboutUs: React.FC = () => {
  return (
    <>
      <h1 className="text-4xl">Miembros</h1>
      <Members />
      <JoinUsBanner />
      <h2 className="text-3x1 pt-10 text-center">Explora nuestras organizaciones aliadas</h2>
      <Partners />
    </>
  );
};
