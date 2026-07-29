import { RequirementsForm } from './components/requirementsForm';
import { RequirementsProvider } from './context/requirementsProvider';

const App = () => {
  return (
    <RequirementsProvider>
      <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
        <RequirementsForm />
      </main>
    </RequirementsProvider>
  );
};

export default App