import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-600 p-4 text-white">
    <Link to="/" className="text-xl font-bold">CryptoPulse</Link>
  </nav>
);

export default Navbar;
