import { AuthProvider } from "./context/AuthContext";
import { AutoCompleteProvider } from "./context/AutoCompleteContext";
import { ChatProvider } from "./context/chat/ChatContext";
import { SocketProvider } from "./context/SocketContext";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AutoCompleteProvider>
            <AppRouter />
          </AutoCompleteProvider>
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  );
};

export default App;
