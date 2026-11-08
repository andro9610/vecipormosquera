import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { DEFAULT_MUNICIPIO } from "../components/toolsPage/const/const";
import { ExpeditionForm } from "../components/toolsPage/expeditionForm/expeditionForm";
import { ExpeditionProvider } from "../components/toolsPage/expeditionForm/context/expeditionContext";
import { ReconsiderationForm } from "../components/toolsPage/reconsiderationForm/reconsiderationForm";
import { ReconsiderationProvider } from "../components/toolsPage/reconsiderationForm/context/reconsiderationContext";
import { RequirementsProvider } from "../components/toolsPage/revisionForm/context/requirementsContext";
import { RevisionForm } from "../components/toolsPage/revisionForm/revisionForm";
import { ToolsPage } from "../components/toolsPage/toolsPage";
import { Bylaws } from "../components/bylaws/bylaws";
import { Home } from "../components/home/home";
import { CourseDetail } from "../components/learn/courseDetail/courseDetail";
import { Learn } from "../components/learn/learn";
import { Layout } from "../layout/layout";

export const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Navigate to="/" replace />} />
        <Route path="tools/*" element={<Outlet />}>
          <Route index element={<ToolsPage />} />
          <Route
            path="solicitudRevisionCatastral"
            element={
              <RequirementsProvider overrides={{ municipio: DEFAULT_MUNICIPIO }}>
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
        <Route path="backdoor/*" element={<Outlet />}>
          <Route
            path="solicitudRevisionCatastral"
            element={
              <RequirementsProvider>
                <RevisionForm isBackdoor />
              </RequirementsProvider>
            }
          />
        </Route>
        <Route path="learn/*" element={<Outlet />}>
          <Route index element={<Learn />} />
          <Route path=":courseSlug" element={<CourseDetail />} />
        </Route>
        <Route path="bylaws" element={<Bylaws />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};
