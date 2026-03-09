import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import AdminLayout from "../layout/AdminLayout";
import AdminNavbar from "../components/AdminNavbar";

function AddPackage() {

const navigate = useNavigate();

const [form,setForm] = useState({
title:"",
destination:"",
price:"",
duration:"",
category:"",
availableSeats:"",
startDate:"",
endDate:"",
description:"",
rating:4
});

const [image,setImage] = useState(null);

const [itinerary,setItinerary] = useState([
{day:1,title:"",description:""}
]);

const handleChange = (e)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};

const handleImage = (e)=>{
setImage(e.target.files[0]);
};

const handleItineraryChange = (index,field,value)=>{
const updated=[...itinerary];
updated[index][field]=value;
setItinerary(updated);
};

const addDay=()=>{
setItinerary([
...itinerary,
{day:itinerary.length+1,title:"",description:""}
]);
};

const submitPackage = async(e)=>{

e.preventDefault();

if(form.price > 50000){
alert("Maximum package price allowed is ₹50,000");
return;
}

try{

const formData = new FormData();

Object.keys(form).forEach(key=>{
formData.append(key,form[key]);
});

if(image){
formData.append("image",image);
}

formData.append("itinerary",JSON.stringify(itinerary));

await API.post("/packages",formData,{
headers:{
"Content-Type":"multipart/form-data"
}
});

alert("Package Added Successfully");

navigate("/admin/packages");

}catch(err){

console.log(err);
alert("Failed to add package");

}

};

return(

<>

<AdminNavbar/>

<AdminLayout>

<div className="admin-page">

<h2>Add New Package</h2>
<button onClick={()=>navigate("/admin/packages")} className="admin-btn" style={{marginBottom:"20px"}} >
    ⬅ Back 
</button>

<form onSubmit={submitPackage} className="admin-form-grid">

{/* TITLE */}
<div className="form-group">
<input 
name="title"
placeholder="Package Title"
onChange={handleChange}
required
/>
</div>

{/* DESTINATION */}
<div className="form-group">
<input 
name="destination"
placeholder="Destination"
onChange={handleChange}
required
/>
</div>

{/* PRICE */}
<div className="form-group">
<input 
name="price"
type="number"
placeholder="Price (Max ₹50,000)"
max="50000"
min="1000"
onChange={handleChange}
required
/>
</div>

{/* DURATION */}
<div className="form-group">
<input 
name="duration"
placeholder="Duration (Example: 3 Days / 2 Nights)"
onChange={handleChange}
/>
</div>

{/* SEATS */}
<div className="form-group">
<input 
name="availableSeats"
type="number"
placeholder="Available Seats"
min="1"
onChange={handleChange}
/>
</div>

{/* CATEGORY */}
<div className="form-group">
<select name="category" onChange={handleChange} required>

<option value="">Select Category</option>
<option value="Beach">Beach</option>
<option value="Hill">Hill</option>
<option value="Adventure">Adventure</option>
<option value="City">City</option>

</select>
</div>

{/* START DATE */}
<div className="form-group">
<label>Start Date</label>
<input type="date" name="startDate" onChange={handleChange}/>
</div>

{/* END DATE */}
<div className="form-group">
<label>End Date</label>
<input type="date" name="endDate" onChange={handleChange}/>
</div>

{/* IMAGE */}
<div className="form-group full-width">
<label>Package Image</label>
<input type="file" accept="image/*" onChange={handleImage}/>
</div>

{/* DESCRIPTION */}
<div className="form-group full-width">
<textarea
name="description"
placeholder="Package Description"
onChange={handleChange}
/>
</div>

{/* ITINERARY TITLE */}
<div className="full-width">
<h3>Trip Itinerary</h3>
</div>

{/* ITINERARY DAYS */}

{itinerary.map((day,index)=>(

<div key={index} className="form-group full-width itinerary-card">

<label>Day {day.day}</label>

<input
placeholder="Title (Example: Arrival)"
onChange={(e)=>handleItineraryChange(index,"title",e.target.value)}
required
/>

<textarea
placeholder="Description"
onChange={(e)=>handleItineraryChange(index,"description",e.target.value)}
required
/>

</div>

))}

{/* ADD DAY */}

<div className="full-width">

<button type="button" onClick={addDay} className="admin-btn">
Add Day
</button>

</div>

{/* SUBMIT */}

<div className="full-width">

<button type="submit" className="primary-btn">
Add Package
</button>

</div>

</form>

</div>

</AdminLayout>

</>

);

}

export default AddPackage;