import { Outlet } from 'react-router-dom';
import AdminNav from './AdminNav'; 
const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;