import { useEffect, useState } from "react";
import API from "../../api/axios";
import AdminLayout from "../layout/AdminLayout";
import AdminNavbar from "../components/AdminNavbar";
import  { useNavigate } from "react-router-dom";

function ManageBookings(){

  const [bookings,setBookings] = useState([]);
   const navigate = useNavigate();

  useEffect(()=>{
    fetchBookings();
  },[]);

  const fetchBookings = async () => {

    const {data} = await API.get("/bookings");

    setBookings(data);

  };

  const updateStatus = async (id,status) => {

    await API.put(`/bookings/${id}/status`,{
      status
    });

    fetchBookings();

  };

  return(

    <>
    <AdminNavbar/>

    <AdminLayout>

      <h2>All Bookings</h2>
      <button onClick={()=>navigate("/admin/packages")} className="admin-btn" style={{marginBottom:"20px"}} >
    ⬅ Back 
</button>

      {bookings.map(b => (

        <div key={b._id} className="booking-card">

          <p><b>User:</b> {b.user?.name}</p>

          <p><b>Package:</b> {b.package?.title}</p>

          <p><b>Status:</b> {b.status}</p>

          {b.status === "Pending" && (

            <div style={{marginTop:"10px"}}>

              <button
                className="admin-btn"
                style={{marginRight:"10px"}}
                onClick={()=>updateStatus(b._id,"Approved")}
              >
                Approve
              </button>

              <button
                className="delete-btn"
                onClick={()=>updateStatus(b._id,"Rejected")}
              >
                Reject
              </button>

            </div>

          )}

        </div>

      ))}

    </AdminLayout>
    </>
  )
}

export default ManageBookings;