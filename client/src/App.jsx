import { AuthProvider } from "./context/AuthContext";
import { AutoCompleteProvider } from "./context/AutoCompleteContext";
import { SocketProvider } from "./context/SocketContext";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <SocketProvider>
      <AuthProvider>
        <AutoCompleteProvider>
          <AppRouter />
        </AutoCompleteProvider>
      </AuthProvider>
    </SocketProvider>
  );
};

export default App;
