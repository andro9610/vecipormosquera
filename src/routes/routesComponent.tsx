import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "../components/home";
import { ReconsiderationForm } from "../components/toolsPage/reconsiderationForm/reconsiderationForm";
import { RevisionForm } from "../components/toolsPage/revisionForm/revisionForm";
import { ToolsPage } from "../components/toolsPage/toolsPage";
import { Layout } from "../layout/layout";
import { ReconsiderationProvider } from "../components/toolsPage/reconsiderationForm/context/reconsiderationProvider";
import { RequirementsProvider } from "../components/toolsPage/revisionForm/context/requirementsProvider";
import { AboutUs } from "../components/aboutUs/aboutUs";
import { ContactUs } from "../components/contactUs/contactUs";
import { PageInProgress } from "../components/pageInProgress/pageInProgress";
import { Volunteer } from "../components/volunteer/volunteer";

export const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="tools/*" element={<Outlet />}>
          <Route index element={<ToolsPage />} />
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
          <Route path="encuestaDocumento" element={<PageInProgress />} />
        </Route>
        <Route path="volunteer" element={<Volunteer />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};
