import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <SocketProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </SocketProvider>
  );
};

export default App;
