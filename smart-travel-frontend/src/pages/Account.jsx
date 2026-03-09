import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Account() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userRes = await API.get("/auth/me");
      const bookingRes = await API.get("/bookings/my");
      const wishlistRes = await API.get("/wishlist");

      setUser(userRes.data);
      setBookings(bookingRes.data);
      setWishlist(wishlistRes.data);
    } catch (error) {
      alert("Failed to load account data");
    }
  };

  if (!user) return <p style={{ padding: "40px" }}>Loading...</p>;

  const total = bookings.length;
  const pending = bookings.filter(b => b.status === "Pending").length;
  const confirmed = bookings.filter(b => b.status === "Confirmed").length;

  return (
    
    <div className="account-container">
      
            <button className="back-btn" onClick={()=>navigate("/packages")}>
        ← Back to Packages
      </button>

      {/* PROFILE SECTION */}
      <div className="account-profile">
        <h2>My Account</h2>
        
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {/* STATS SECTION */}
      <div className="account-stats">
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p>{total}</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>

        <div className="stat-card">
          <h3>Confirmed</h3>
          <p>{confirmed}</p>
        </div>

        <div className="stat-card">
          <h3>Wishlist</h3>
          <p>{wishlist.length}</p>
        </div>
      </div>

      {/* RECENT BOOKINGS */}
      <div className="recent-bookings">
        <h3>Recent Bookings</h3>

        {bookings.slice(0, 2).map((b) => (
          <div key={b._id} className="recent-card">
            <p>{b.package?.title}</p>
            <span>{b.status}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Account;