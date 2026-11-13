
import AppRoutes from "./routes/AppRoutes";
import { ShopProvider } from "./context/ShopContext";

function App() {
  return (
    <ShopProvider>
      <AppRoutes />
    </ShopProvider>
  );
}

export default App;
