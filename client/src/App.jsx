import { AuthProvider } from "./context/AuthContext";
import { AutoCompleteProvider } from "./context/AutoCompleteContext";
import { SocketProvider } from "./context/SocketContext";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <AutoCompleteProvider>
          <AppRouter />
        </AutoCompleteProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
