import "./assets/styles/App.css";
import Navbar from "./components/ui/Navbar";
import { Toaster } from "./components/ui/toaster";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

const App = () => {
  return (
    <>
      <Navbar />
      <Signup />
      <Toaster />
    </>
  );
};

export default App;
