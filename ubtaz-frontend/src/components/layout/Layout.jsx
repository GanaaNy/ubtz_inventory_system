import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../hooks/useAuth';

const pageTitles = {
  '/': 'Хяналтын самбар',
  '/materials': 'Материалын бүртгэл',
  '/inventory': 'Нөөцийн гүйлгээ',
  '/warehouse': 'Агуулах',
  '/reports': 'Тайлан',
};

export default function Layout() {
  const { user, logout } = useAuth();
  const title = pageTitles[window.location.pathname] || 'УБТЗ';

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header title={title} user={user} onLogout={logout} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
