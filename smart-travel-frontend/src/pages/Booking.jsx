import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Booking() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    persons: 1,
    travelDate: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/bookings", {
        packageId: id,
        persons: form.persons,
        travelDate: form.travelDate,
      });

      alert("Booking Successful 🎉");
      navigate("/my-bookings");

    } catch (error) {

      alert(error.response?.data?.message || "Booking failed");

    }
  };

  return (

    <div className="booking-container">

      <h2>Book This Trip</h2>

      

      <form onSubmit={handleSubmit}>

        <label>Travel Date</label>

        <input
          type="date"
          name="travelDate"
          value={form.travelDate}
          onChange={handleChange}
          required
        />

        <label>Number of Persons</label>

        <input
          type="number"
          name="persons"
          value={form.persons}
          onChange={handleChange}
          min="1"
          required
        />

        <button type="submit" className="primary-btn">
          Confirm Booking
        </button>

      <button className="back-btn" onClick={()=>navigate("/packages")}>
        ← Back to Packages
      </button>
      </form>

    </div>

  );
}

export default Booking;