import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Packages() {

  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [category, setCategory] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {

    const fetchPackages = async () => {

      try {

        const { data } = await API.get("/packages");
        setPackages(data);

      } catch (error) {

        console.error("Error loading packages");

      }

    };

    fetchPackages();

  }, []);

  const filtered = packages.filter((pkg) => {

    return (
      pkg.destination.toLowerCase().includes(search.toLowerCase()) &&
      pkg.price <= maxPrice &&
      (category === "All" || pkg.category === category)
    );

  });


  // Trip Status
  const getTripStatus = (pkg) => {

    if (!pkg.startDate) return "Date not set";

    const today = new Date();
    const start = new Date(pkg.startDate);
    const end = new Date(pkg.endDate);

    if (today < start) {

      const diff = Math.ceil((start - today) / (1000 * 60 * 60 * 24));
      return `${diff} days left`;

    }

    if (today >= start && today <= end) {

      return "Trip Started";

    }

    return "Trip Ended";

  };



  const isBookingClosed = (pkg) => {

    if (!pkg.endDate) return false;

    const today = new Date();
    const end = new Date(pkg.endDate);

    return today > end || pkg.availableSeats <= 0;

  };


  return (

    <div className="container">

      <h2 className="page-title">Explore Destinations</h2>

      {/* Filters */}

      <div className="filters">

        <input
          type="text"
          placeholder="Search by destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >

          <option value="All">All Categories</option>
          <option value="Beach">Beach</option>
          <option value="Hill">Hill</option>
          <option value="Adventure">Adventure</option>
          <option value="City">City</option>

        </select>

        <div>

          <label>Max Price: ₹{maxPrice}</label>

          <input
            type="range"
            min="1000"
            max="50000"
            step="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />

        </div>

      </div>


      {/* Packages Grid */}

      <div className="card-grid">

        {filtered.length > 0 ? (

          filtered.map((pkg) => (

            <div key={pkg._id} className="package-card">

              <img
                src={
                  pkg.image && pkg.image !== ""
                    ? `https://smart-travel-backend-5var.onrender.com${pkg.image}`
                    : `https://source.unsplash.com/600x400/?${pkg.destination}`
                }
                alt={pkg.title}
                className="card-img"
              />

              <h3>{pkg.title}</h3>

              <p>📍 {pkg.destination}</p>

              <p>⏳ {pkg.duration || "3 Days / 2 Nights"}</p>

              <p>💰 ₹{pkg.price}</p>

              <p>🏷 {pkg.category}</p>

              <p>⭐ {"⭐".repeat(pkg.rating)}</p>


              {/* Trip Dates */}
              <p>
                📅 Start:{" "}
                {pkg.startDate
                  ? new Date(pkg.startDate).toLocaleDateString()
                  : "Not set"}
              </p>

              <p>
                🏁 End:{" "}
                {pkg.endDate
                  ? new Date(pkg.endDate).toLocaleDateString()
                  : "Not set"}
              </p>


              {/* Countdown */}
              <p>⏱ {getTripStatus(pkg)}</p>


              {/* Seats */}
              <p>🎟 Seats Left: {pkg.availableSeats}</p>

              {pkg.availableSeats <= 3 && pkg.availableSeats > 0 && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  ⚠ Only {pkg.availableSeats} seats left!
                </p>
              )}

              {pkg.availableSeats === 0 && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  ❌ Sold Out
                </p>
              )}


              {/* Buttons */}

              <div className="card-buttons">

                <button
                  className="details-btn"
                  onClick={() => navigate(`/package/${pkg._id}`)}
                >
                  View Details
                </button>

                <button
                  className="primary-btn"
                  disabled={isBookingClosed(pkg)}
                  onClick={() => navigate(`/booking/${pkg._id}`)}
                >
                  {isBookingClosed(pkg) ? "Booking Closed" : "Book Now"}
                </button>

              </div>

            </div>

          ))

        ) : (

          <p style={{ marginTop: "30px" }}>
            No packages found
          </p>

        )}

      </div>

    </div>

  );

}

export default Packages;