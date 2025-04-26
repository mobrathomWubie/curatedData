import { Outlet } from 'react-router-dom';
// In: src/components/layouts/UserLayout.js
import Header from '../Header';  // If you have src/components/Header.js
import Footer from '../Footer';

const UserLayout = () => {
  return (
    <div className="user-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;