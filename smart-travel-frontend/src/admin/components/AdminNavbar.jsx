import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/file_0000000005e47208aadbc7fd81c22e0e.png";

function AdminNavbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <nav className="navbar">

      <div className="logo" style={{display:"flex",alignItems:"center",gap:"12px"}}>
        <img
          src={logo}
          alt="PackNGo Logo"
          style={{height:"75px",objectFit:"contain"}}
        />
        PackNGo
      </div>

      <div className="nav-links">

        <span className="welcome">
          Welcome Admin
        </span>

        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/packages">Packages</Link>
        <Link to="/admin/bookings">Bookings</Link>
        <Link to="/admin/users">Users</Link>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>

      </div>

    </nav>
  );
}

export default AdminNavbar;