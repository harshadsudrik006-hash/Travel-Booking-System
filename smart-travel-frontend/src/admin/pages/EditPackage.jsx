import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import API from "../../api/axios";
import AdminLayout from "../layout/AdminLayout";
import AdminNavbar from "../components/AdminNavbar";

function EditPackage(){

const {id} = useParams();
const navigate = useNavigate();

const [form,setForm] = useState({});
const [imagePreview,setImagePreview] = useState("");

useEffect(()=>{

fetchPackage();

},[]);

const fetchPackage = async()=>{

try{

const {data} = await API.get(`/packages/${id}`);

setForm(data);
setImagePreview(data.image);

}catch(err){

alert("Failed to load package");

}

};

const handleChange = (e)=>{

setForm({

...form,
[e.target.name]:e.target.value

});

};

const updatePackage = async(e)=>{

e.preventDefault();

try{

await API.put(`/packages/${id}`,form);

alert("Package Updated Successfully");

navigate("/admin/packages");

}catch(err){

alert("Update failed");

}

};

return(

<>

<AdminNavbar/>

<AdminLayout>

<div className="admin-page">

<h2>Edit Package</h2>

<button onClick={()=>navigate("/admin/packages")} className="admin-btn" style={{marginBottom:"20px"}} >
    ⬅ Back 
</button>

<form className="admin-form-grid" onSubmit={updatePackage}>

<div className="form-group">
<label>Package Title</label>
<input
name="title"
value={form.title || ""}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Destination</label>
<input
name="destination"
value={form.destination || ""}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Price</label>
<input
type="number"
name="price"
value={form.price || ""}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Duration</label>
<input
name="duration"
value={form.duration || ""}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Available Seats</label>
<input
type="number"
name="availableSeats"
value={form.availableSeats || ""}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Category</label>
<select
name="category"
value={form.category || ""}
onChange={handleChange}
>
<option value="">Select</option>
<option value="Beach">Beach</option>
<option value="Hill">Hill</option>
<option value="Adventure">Adventure</option>
<option value="City">City</option>
</select>
</div>

<div className="form-group">
<label>Start Date</label>
<input
type="date"
name="startDate"
value={form.startDate ? form.startDate.split("T")[0] : ""}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>End Date</label>
<input
type="date"
name="endDate"
value={form.endDate ? form.endDate.split("T")[0] : ""}
onChange={handleChange}
/>
</div>

<div className="form-group full-width">
<label>Description</label>
<textarea
name="description"
value={form.description || ""}
onChange={handleChange}
/>
</div>

{imagePreview && (

<div className="form-group full-width">

<label>Current Image</label>

<img
src={`http://localhost:5000${imagePreview}`}
alt="package"
style={{
width:"200px",
borderRadius:"10px",
marginTop:"10px"
}}
/>

</div>

)}

<div className="form-group full-width">

<button type="submit" className="primary-btn">

Update Package

</button>

</div>

</form>

</div>

</AdminLayout>

</>

)

}

export default EditPackage;
