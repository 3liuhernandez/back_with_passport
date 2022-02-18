import './App.css';
import AllRoutes from './routes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AllRoutes />
    </AuthProvider>
  );
}

export default App;
