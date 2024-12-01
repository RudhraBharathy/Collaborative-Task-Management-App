import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CTMLogo from "../../assets/images/CTMLogo.png";

const navbarLinkButtonStyles =
  "text-white font-medium flex items-center text-lg transition-colors px-4 py-1 border bg-primary border-primary rounded-md hover:bg-white hover:text-primary";

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <img className="h-10 px-2" src={CTMLogo} alt="CTM Logo" />
            <span className="text-2xl">CTM</span>
          </Link>
          <nav className="hidden md:flex gap-10">
            <Link to="/" className={navbarLinkButtonStyles}>
              Home
            </Link>
            <Link to="/about" className={navbarLinkButtonStyles}>
              About
            </Link>
            <Link to="/services" className={navbarLinkButtonStyles}>
              Services
            </Link>
            <Link to="/contact" className={navbarLinkButtonStyles}>
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/signup">
              <Button className="px-4 py-1 border border-primary rounded-md hover:bg-white hover:text-primary">
                Signup
              </Button>
            </Link>
            <Link to="/login">
              <Button className="px-4 py-1 border border-primary rounded-md hover:bg-white hover:text-primary">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
