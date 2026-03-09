import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/file_0000000005e47208aadbc7fd81c22e0e.png";

function Navbar() {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (

    <nav className="navbar">

      <div className="logo">
        <img src={logo} alt="logo" height="90"/>
        Pack&Go
      </div>

      <div className="nav-links">

   

        <Link to="/">Home</Link>
        <Link to="/packages">Packages</Link>

        {user ? (

          <>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/my-bookings">My Bookings</Link>
            <Link to="/account">Account</Link>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>

        ) : (

          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>

        )}

      </div>

    </nav>

  );
}

export default Navbar;