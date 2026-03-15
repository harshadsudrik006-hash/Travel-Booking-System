import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function PackageDetails(){

const {id}=useParams();
const navigate=useNavigate();

const [pkg,setPkg]=useState(null);

useEffect(()=>{
fetchPackage();
},[]);

const fetchPackage=async()=>{

try{

const {data}=await API.get(`/packages/${id}`);
setPkg(data);

}catch(error){

alert("Failed to load package");

}

};

const addToWishlist=async()=>{

try{

await API.post(`/wishlist/${id}`);
alert("Added to Wishlist ❤️");

}catch(error){

alert(error.response?.data?.message || "Failed");

}

};

if(!pkg)
return(
<div style={{padding:"60px",textAlign:"center"}}>
Loading package details...
</div>
);

return(

<div className="details-container">

<button className="back-btn" onClick={()=>navigate("/packages")}>
← Back to Packages
</button>

{/* PACKAGE TOP SECTION */}

<div className="details-card">

<img
src={
pkg.image
?`https://smart-travel-backend-5var.onrender.com${pkg.image}`
:`https://source.unsplash.com/600x400/?${pkg.destination}`
}
alt={pkg.title}
className="details-image"
/>

<div className="details-content">

<h2>{pkg.title}</h2>

<p>📍 {pkg.destination}</p>

<p>⏳ Duration: {pkg.duration || "3 Days / 2 Nights"}</p>

<p>👥 Seats Available: {pkg.availableSeats}</p>

<p>📅 Start Date: {pkg.startDate ? new Date(pkg.startDate).toDateString() : "Flexible"}</p>

<p>🏷 Category: {pkg.category}</p>

<p>⭐ {"⭐".repeat(pkg.rating || 4)}</p>

<p className="details-price">₹{pkg.price}</p>

<p>{pkg.description}</p>

<div className="details-buttons">

<button
className="primary-btn"
onClick={()=>navigate(`/booking/${pkg._id}`)}
>
Book Now
</button>

<button className="wishlist-btn" onClick={addToWishlist}>
❤️ Add to Wishlist
</button>

</div>

</div>

</div>


{/* ⭐ FULL WIDTH ITINERARY */}

<h3 style={{marginTop:"40px"}}>Trip Itinerary</h3>

{pkg.itinerary && pkg.itinerary.length>0 ?(

<div className="itinerary-grid">

{pkg.itinerary.map((day)=>(
<div key={day.day} className="itinerary-card">

<h4>Day {day.day} - {day.title}</h4>

<p>{day.description}</p>

</div>
))}

</div>

):( <p>No itinerary available</p> )}

</div>

);

}

export default PackageDetails;