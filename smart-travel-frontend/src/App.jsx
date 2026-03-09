import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Packages from "./pages/Packages";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import PackageDetails from "./pages/PackageDetails";
import GoogleSuccess from "./pages/GoogleSuccess";

import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import ManagePackages from "./admin/pages/ManagePackages";
import ManageBookings from "./admin/pages/ManageBookings";
import ManageUsers from "./admin/pages/ManageUsers";
import AddPackage from "./admin/pages/AddPackage";
import EditPackage from "./admin/pages/EditPackage";

function App() {

  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isAdminRoute = location.pathname.startsWith("/admin");

  // ⭐ ADMIN PROTECTION
  const AdminRoute = ({ children }) => {

    if (!user) {
      return <Navigate to="/admin/login" />;
    }

    if (user.role !== "admin") {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <>
      {/* Hide Navbar in Admin Panel */}
      {!isAdminRoute && <Navbar />}

      <Routes>

        {/* ================= USER ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />

        <Route path="/google-success" element={<GoogleSuccess />} />

        <Route
          path="/packages"
          element={
            <ProtectedRoute>
              <Packages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/package/:id"
          element={
            <ProtectedRoute>
              <PackageDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/packages"
          element={
            <AdminRoute>
              <ManagePackages />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-package"
          element={
            <AdminRoute>
              <AddPackage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/edit-package/:id"
          element={
            <AdminRoute>
              <EditPackage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <AdminRoute>
              <ManageBookings />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />

        {/* ================= 404 ================= */}

        <Route path="*" element={<Home />} />

      </Routes>
    </>
  );
}

export default App;