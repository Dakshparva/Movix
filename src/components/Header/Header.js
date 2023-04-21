
import Trending from "../../Pages/Trending/Trending";
import "./Header.css";

const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
      🎬 Movie Hub 🎥 
    </span>
  );
};

export default Header;