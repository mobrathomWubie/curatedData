import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <nav className="admin-nav">
      <Link to="/admin/datasets">Datasets</Link>
      <Link to="/admin/upload">Upload</Link>
    </nav>
  );
};

export default AdminNav;