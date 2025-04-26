import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Page Components
import Home from './components/marketplace/Home';
import BrowseDatasets from './components/marketplace/BrowseDatasets';
import DatasetDetail from './components/marketplace/DatasetDetail';
import UploadDataset from './components/Admin/UploadDataset';
import Login from './components/Login';
import Register from './components/Register';

// Layout Wrappers
const UserLayout = () => (
  <div className="user-layout">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

const AdminLayout = ({ children }) => {  // Changed to accept children
  const { user } = useSelector(state => state.auth);
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-layout">
      <Header />
      <main>
        <Outlet />  {/* Changed from children to Outlet */}
      </main>
    </div>
  );
};

const AuthLayout = () => (
  <div className="auth-layout">
    <Outlet />
  </div>
);

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="browse" element={<BrowseDatasets />} />
        <Route path="datasets/:id" element={<DatasetDetail />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="upload" replace />} />
        <Route path="upload" element={<UploadDataset />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;