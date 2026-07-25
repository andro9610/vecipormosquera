import 'bootstrap/dist/css/bootstrap.min.css';
import { RequirementsForm } from './components/requirementsForm';
import { RequirementsProvider } from './context/requirementsProvider';

const App = () => {
  return (
    <RequirementsProvider>
      <RequirementsForm />
    </RequirementsProvider>
  );
};

export default App