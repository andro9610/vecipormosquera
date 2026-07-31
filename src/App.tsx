import { Home } from "./components/home";
import { ReconsiderationForm } from "./components/reconsiderationForm";
import { RevisionForm } from "./components/revisionForm";
import { Tools } from "./components/tools";
import { Layout } from "./layout/layout";
import { ReconsiderationProvider } from "./context/reconsiderationProvider";
import { RequirementsProvider } from "./context/requirementsProvider";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="tools"
          element={
            <Layout>
              <Tools />
            </Layout>
          }
        />
        <Route
          path="solicitudRevisionCatastral"
          element={
            <Layout>
              <RequirementsProvider>
                <RevisionForm />
              </RequirementsProvider>
            </Layout>
          }
        />
        <Route
          path="solicitudReconsideracionPredial"
          element={
            <Layout>
              <ReconsiderationProvider>
                <ReconsiderationForm />
              </ReconsiderationProvider>
            </Layout>
          }
        />
      </Routes>
    </main>
  );
};

export default App;
