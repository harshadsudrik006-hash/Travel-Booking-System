import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Wishlist() {

  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {

    try {

      const { data } = await API.get("/wishlist");

      setWishlist(data);

    } catch (error) {

      console.log(error);
      alert("Failed to load wishlist");

    }

  };

  const removeFromWishlist = async (id) => {

    try {

      await API.delete(`/wishlist/${id}`);

      // refresh wishlist
      fetchWishlist();

    } catch (error) {

      alert("Remove failed");

    }

  };

  return (

    <div className="container">

      <h2 className="page-title">My Wishlist ❤️</h2>
      <button className="back-btn" onClick={()=>navigate("/packages")}>
        ← Back to Packages
      </button>

      {wishlist.length === 0 ? (

        <p style={{marginTop:"20px"}}>
          No saved packages yet.
        </p>

      ) : (

        <div className="card-grid">

          {wishlist.map((pkg) => (

            <div key={pkg._id} className="package-card">

              {/* PACKAGE IMAGE */}
              <img
                src={
                  pkg.image
                    ? `http://localhost:5000${pkg.image}`
                    : `https://source.unsplash.com/400x300/?${pkg.destination}`
                }
                alt={pkg.title}
                className="card-img"
              />

              <h3>{pkg.title}</h3>

              <p>📍 {pkg.destination}</p>

              <p>💰 ₹{pkg.price}</p>

              <div style={{ display: "flex", gap: "10px", marginTop:"10px" }}>

                {/* VIEW PACKAGE */}
                <button
                  className="primary-btn"
                  onClick={() => navigate(`/package/${pkg._id}`)}
                >
                  View
                </button>

                {/* REMOVE FROM WISHLIST */}
                <button
                  className="wishlist-btn"
                  onClick={() => removeFromWishlist(pkg._id)}
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Wishlist;