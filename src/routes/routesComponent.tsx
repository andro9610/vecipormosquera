import { Outlet, Route, Routes } from "react-router-dom";
import { ReconsiderationForm } from "../components/toolsPage/reconsiderationForm/reconsiderationForm";
import { RevisionForm } from "../components/toolsPage/revisionForm/revisionForm";
import { ToolsPage } from "../components/toolsPage/toolsPage";
import { Layout } from "../layout/layout";
import { ReconsiderationProvider } from "../components/toolsPage/reconsiderationForm/context/reconsiderationProvider";
import { RequirementsProvider } from "../components/toolsPage/revisionForm/context/requirementsProvider";
import { ExpeditionProvider } from "../components/toolsPage/expeditionForm/context/expeditionProvider";
import { ContactUs } from "../components/contactUs/contactUs";
import { Bylaws } from "../components/bylaws/bylaws";
import { ExpeditionForm } from "../components/toolsPage/expeditionForm/expeditionForm";
import { Home } from "../components/home/home";

export const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {<Route index element={<Home />} />}
        {/**<Route index element={<TestPage />} />*/}
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
          <Route
            path="solicitudExpedicionPredial"
            element={
              <ExpeditionProvider>
                <ExpeditionForm />
              </ExpeditionProvider>
            }
          />
        </Route>
        <Route path="bylaws" element={<Bylaws />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

