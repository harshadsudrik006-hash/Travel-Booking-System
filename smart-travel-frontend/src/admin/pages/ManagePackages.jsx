import { useEffect, useState } from "react";
import API from "../../api/axios";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function ManagePackages(){

  const [packages,setPackages] = useState([]);
  const [search,setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    fetchPackages();
  },[]);

  const fetchPackages = async () => {

    try{

      const {data} = await API.get("/packages");
      setPackages(data);

    }catch(err){

      console.log("Error loading packages");

    }

  };

  const deletePackage = async (id) => {

    if(!window.confirm("Delete this package?")) return;

    try{

      await API.delete(`/packages/${id}`);
      fetchPackages();

    }catch(err){

      alert("Delete failed");

    }

  };


  /* SEARCH FILTER */

  const filteredPackages = packages.filter(pkg =>
    pkg.title?.toLowerCase().includes(search.toLowerCase()) ||
    pkg.destination?.toLowerCase().includes(search.toLowerCase())
  );


  return(

    <>
    <AdminNavbar/>

    <AdminLayout>

      {/* HEADER */}

      <div className="admin-header">

        <h2>Manage Packages</h2>

        <button
          className="admin-btn"
          onClick={() => navigate("/admin/add-package")}
        >
          Add Package
        </button>

      </div>


      {/* SEARCH */}

      <input
        placeholder="Search package..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{
          marginBottom:"20px",
          padding:"8px",
          width:"250px",
          borderRadius:"6px",
          border:"1px solid #ccc"
        }}
      />


      {/* TABLE */}

      <table className="admin-table">

        <thead>

          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Destination</th>
            <th>Price</th>
            <th>Seats</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Action</th>
          </tr>

        </thead>


        <tbody>

          {filteredPackages.length > 0 ? (

            filteredPackages.map(pkg => (

              <tr key={pkg._id}>

                {/* IMAGE */}

                <td>

                  <img
                    src={
                      pkg.image
                        ? `http://localhost:5000${pkg.image}`
                        : `https://source.unsplash.com/100x80/?${pkg.destination}`
                    }
                    alt={pkg.title}
                    style={{
                      width:"80px",
                      height:"60px",
                      objectFit:"cover",
                      borderRadius:"6px"
                    }}
                  />

                </td>


                <td>{pkg.title}</td>

                <td>{pkg.destination}</td>

                <td>₹{pkg.price}</td>

                <td>{pkg.availableSeats}</td>


                {/* START DATE */}

                <td>

                  {pkg.startDate
                    ? new Date(pkg.startDate).toLocaleDateString()
                    : "-"}

                </td>


                {/* END DATE */}

                <td>

                  {pkg.endDate
                    ? new Date(pkg.endDate).toLocaleDateString()
                    : "-"}

                </td>


         {/* ACTION */}

<td>
  <div className="action-buttons">

    <button
      className="admin-btn"
      onClick={() => navigate(`/admin/edit-package/${pkg._id}`)}
    >
      Edit
    </button>

    <button
      className="delete-btn"
      onClick={() => deletePackage(pkg._id)}
    >
      Delete
    </button>

  </div>
</td>


              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="8" style={{textAlign:"center",padding:"20px"}}>
                No packages found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </AdminLayout>

    </>
  )

}

export default ManagePackages;