import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "../components/home";
import { ReconsiderationForm } from "../components/reconsiderationForm/reconsiderationForm";
import { RevisionForm } from "../components/revisionForm/revisionForm";
import { Tools } from "../components/tools";
import { Layout } from "../layout/layout";
import { ReconsiderationProvider } from "../components/reconsiderationForm/context/reconsiderationProvider";
import { RequirementsProvider } from "../context/requirementsProvider";
import { AboutUs } from "../components/aboutUs";
import { ContactUs } from "../components/contactUs";

export const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="tools/*" element={<Outlet />}>
          <Route index element={<Tools />} />
          <Route
            path="solicitudRevisionCatastral"
            element={
              <RequirementsProvider>
                <RevisionForm />
              </RequirementsProvider>
            }
          />
          <Route
            path="solicitudReconsideracionPredial"
            element={
              <ReconsiderationProvider>
                <ReconsiderationForm />
              </ReconsiderationProvider>
            }
          />
          <Route path="encuestaDocumento" element={<div>Texto</div>} />
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};
