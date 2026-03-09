import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get("/bookings/my");
      setBookings(data);
    } catch (error) {
      alert("Failed to fetch bookings");
    }
  };

  const cancelBooking = async (id) => {
    try {
      await API.delete(`/bookings/${id}`);
      fetchBookings();
    } catch (error) {
      alert("Cancel failed");
    }
  };

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">My Bookings</h2>


      <button className="back-btn" onClick={()=>navigate("/packages")}>
← Back to Packages
</button>

      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings yet</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <h3>{booking.package?.title}</h3>

              <p>
                <span>📍</span> {booking.package?.destination}
              </p>

              <p>
                <span>📅</span>{" "}
                {new Date(booking.travelDate).toLocaleDateString()}
              </p>

              <p>
                <span>👥</span> {booking.persons} Persons
              </p>

              <p>
                <span>💰</span> ₹{booking.totalPrice}
              </p>

              <div className="booking-footer">
                <span
                  className={`status-badge ${
                    booking.status.toLowerCase()
                  }`}
                >
                  {booking.status}
                </span>

                {booking.status === "Pending" && (
                  <button
                    className="cancel-btn"
                    onClick={() => cancelBooking(booking._id)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;