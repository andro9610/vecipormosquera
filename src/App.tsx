import { RoutesComponent } from "./routes/routesComponent";
import { ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <>
      <main className="min-h-screen px-4 py-3 md:px-4 md:py-3">
        <RoutesComponent />
        <ToastContainer 
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"  
        />
      </main>
    </>
  );
};

export default App;
