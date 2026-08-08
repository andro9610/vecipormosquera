import { Outlet, Route, Routes } from "react-router-dom";
import { ReconsiderationForm } from "../components/toolsPage/reconsiderationForm/reconsiderationForm";
import { RevisionForm } from "../components/toolsPage/revisionForm/revisionForm";
import { ToolsPage } from "../components/toolsPage/toolsPage";
import { Layout } from "../layout/layout";
import { ReconsiderationProvider } from "../components/toolsPage/reconsiderationForm/context/reconsiderationProvider";
import { RequirementsProvider } from "../components/toolsPage/revisionForm/context/requirementsProvider";
import { AboutUs } from "../components/aboutUs/aboutUs";
import { ContactUs } from "../components/contactUs/contactUs";
import { PageInProgress } from "../components/pageInProgress/pageInProgress";
import { Bylaws } from "../components/bylaws/bylaws";
import { OrganizationTimeline } from "../components/organizationTimeline/organizationTimeLine";
import { JoinUsForm } from "../components/aboutUs/components/joinUsForm/joinUsForm";

export const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<OrganizationTimeline />} />
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="joinUs" element={<JoinUsForm />} />
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
        <Route path="bylaws" element={<Bylaws />} />
        <Route path="*" element={<OrganizationTimeline />} />
      </Route>
    </Routes>
  );
};
