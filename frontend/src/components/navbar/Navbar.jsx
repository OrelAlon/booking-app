import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./navbar.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className='navbar'>
      <div className='navContainer'>
        <Link to='/' style={{ color: "inherit", textDecoration: "none" }}>
          <span className='logo'>Booking.orel</span>
        </Link>
        {user ? (
          user.username
        ) : (
          <div className='navItems'>
            <button className='navButton'>Register</button>
            <button onClick={handleLogin} className='navButton'>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
