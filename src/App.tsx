import "./assets/styles/App.css";
import Navbar from "./components/ui/Navbar";
import { Toaster } from "./components/ui/toaster";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Toaster />
    </>
  );
};

export default App;
