import { ReconsiderationForm } from './components/reconsiderationForm';
import { RequirementsForm } from './components/requirementsForm';
import { RequirementsProvider } from './context/requirementsProvider';
import { Outlet, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <RequirementsProvider>
      <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<RequirementsForm />} />
            <Route path="solicitudRevisionCatastral" element={<RequirementsForm />} />
            <Route path="solicitudReconsideracionPredial" element={<ReconsiderationForm />} />
          </Route>
        </Routes>
      </main>
    </RequirementsProvider>
  );
};

export default App