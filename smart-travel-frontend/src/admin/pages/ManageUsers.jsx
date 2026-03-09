import { useEffect,useState } from "react";
import API from "../../api/axios";
import AdminLayout from "../layout/AdminLayout";
import AdminNavbar from "../components/AdminNavbar";
import  { useNavigate } from "react-router-dom";

function ManageUsers(){

  const [users,setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    fetchUsers();
  },[]);

  const fetchUsers = async () => {
    const {data} = await API.get("/users");
    setUsers(data);
  };

  const deleteUser = async (id) => {

    if(!window.confirm("Delete this user?")) return;

    await API.delete(`/users/${id}`);

    fetchUsers();

  };

  return(
    <>
    <AdminNavbar/>

    <AdminLayout>

      <h2>Users</h2>
      <button onClick={()=>navigate("/admin/packages")} className="admin-btn" style={{marginBottom:"20px"}} >
    ⬅ Back 
</button>

      <table className="admin-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>

              <td>

                <button
                  className="delete-btn"
                  onClick={()=>deleteUser(u._id)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </AdminLayout>
    </>
  )
}

export default ManageUsers;