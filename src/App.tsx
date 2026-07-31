import { ReconsiderationForm } from './components/reconsiderationForm';
import { RevisionForm } from './components/revisionForm';
import { SelectionCard } from './components/selectionCard';
import { Layout } from './layout/layout';
import { ReconsiderationProvider } from './context/reconsiderationProvider';
import { RequirementsProvider } from './context/requirementsProvider';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
      <Routes>
        <Route path="/" element={<SelectionCard />} />
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
        <Route path="layout" element={<Layout />} />
      </Routes>
    </main>
  );
};

export default App