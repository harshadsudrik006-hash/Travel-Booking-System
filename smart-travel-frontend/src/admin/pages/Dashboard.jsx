import { useEffect, useState } from "react";
import API from "../../api/axios";
import AdminLayout from "../layout/AdminLayout";
import AdminNavbar from "../components/AdminNavbar";

function Dashboard(){

const [stats,setStats] = useState({
users:0,
packages:0,
bookings:0,
revenue:0
});

const [recentBookings,setRecentBookings] = useState([]);
const [popular,setPopular] = useState([]);

const [search,setSearch] = useState("");
const [searchResults,setSearchResults] = useState([]);

useEffect(()=>{

const loadStats = async () => {

const users = await API.get("/users");
const packages = await API.get("/packages");
const bookings = await API.get("/bookings");

const revenue = await API.get("/bookings/stats/dashboard");
const popularPackages = await API.get("/bookings/stats/popular");

setStats({
users:users.data.length,
packages:packages.data.length,
bookings:bookings.data.length,
revenue:revenue.data.revenue
});

setRecentBookings(bookings.data.slice(0,5));
setPopular(popularPackages.data);

};

loadStats();

},[]);


// SEARCH FUNCTION

const handleSearch = async () => {

if(!search) return;

const users = await API.get("/users");
const packages = await API.get("/packages");
const bookings = await API.get("/bookings");

const results = [

...users.data
.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
.map(u => ({...u,type:"user"})),

...packages.data
.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
.map(p => ({...p,type:"package"})),

...bookings.data
.filter(b => b._id.includes(search))
.map(b => ({...b,type:"booking"}))

];

setSearchResults(results);

};


return(

<>
<AdminNavbar/>

<AdminLayout>

<h1>Admin Dashboard</h1>

{/* SEARCH */}

<div style={{margin:"20px 0",display:"flex",gap:"10px"}}>

<input
placeholder="Search users / packages / bookings"
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{padding:"8px",width:"250px"}}
/>

<button className="admin-btn" onClick={handleSearch}>
Search
</button>

</div>


{/* STATS */}

<div className="admin-stats">

<div className="stat-card">
<h3>Total Users</h3>
<p>{stats.users}</p>
</div>

<div className="stat-card">
<h3>Total Packages</h3>
<p>{stats.packages}</p>
</div>

<div className="stat-card">
<h3>Total Bookings</h3>
<p>{stats.bookings}</p>
</div>

<div className="stat-card">
<h3>Total Revenue</h3>
<p>₹ {stats.revenue}</p>
</div>

</div>


{/* RECENT BOOKINGS */}

<h2 style={{marginTop:"40px"}}>Recent Bookings</h2>

<table className="admin-table">

<thead>
<tr>
<th>User</th>
<th>Package</th>
<th>Persons</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{recentBookings.map(b=>(
<tr key={b._id}>
<td>{b.user?.name}</td>
<td>{b.package?.title}</td>
<td>{b.persons}</td>
<td>{b.status}</td>
</tr>
))}

</tbody>

</table>


{/* POPULAR PACKAGES */}

<h2 style={{marginTop:"40px"}}>Popular Packages</h2>

<table className="admin-table">

<thead>
<tr>
<th>Package</th>
<th>Bookings</th>
</tr>
</thead>

<tbody>

{popular.map(p=>(
<tr key={p._id}>
<td>{p.package.title}</td>
<td>{p.bookings}</td>
</tr>
))}

</tbody>

</table>


{/* SEARCH RESULTS */}

{searchResults.length > 0 && (

<>

<h2 style={{marginTop:"40px"}}>Search Results</h2>

<div className="card-grid">

{searchResults.map((r,i)=>(

<div key={i} className="package-card">

{/* USER RESULT */}
{r.type === "user" && (
<>
<h3>{r.name}</h3>
<p>📧 {r.email}</p>
<p>Role: {r.role}</p>
</>
)}

{/* PACKAGE RESULT */}
{r.type === "package" && (
<>
<img
src={`http://localhost:5000${r.image}`}
className="card-img"
alt={r.title}
/>

<h3>{r.title}</h3>
<p>📍 {r.destination}</p>
<p>💰 ₹{r.price}</p>
</>
)}

{/* BOOKING RESULT */}
{r.type === "booking" && (
<>
<h3>Booking ID</h3>
<p>{r._id}</p>
<p>Status: {r.status}</p>
<p>Persons: {r.persons}</p>
</>
)}

</div>

))}

</div>

</>

)}

</AdminLayout>

</>

);

}

export default Dashboard;