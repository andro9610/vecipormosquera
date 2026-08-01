import { Home } from "./components/home";
import { ReconsiderationForm } from "./components/reconsiderationForm";
import { RevisionForm } from "./components/revisionForm";
import { Tools } from "./components/tools";
import { Layout } from "./layout/layout";
import { ReconsiderationProvider } from "./context/reconsiderationProvider";
import { RequirementsProvider } from "./context/requirementsProvider";
import { Route, Routes } from "react-router-dom";
import { AboutUs } from "./components/aboutUs";
import { ContactUs } from "./components/contactUs";

const App = () => {
  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
      <Routes>
        <Route
          path="*"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
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
          }>
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
        </Route>
        <Route
          path="aboutUs"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path="contact"
          element={
            <Layout>
              <ContactUs />
            </Layout>
          }
        />
      </Routes>
    </main>
  );
};

export default App;
