import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const navItems = [
  { to: ROUTES.DASHBOARD, label: 'Хяналтын самбар', icon: '📊' },
  { to: ROUTES.MATERIALS, label: 'Материал', icon: '📦' },
  { to: ROUTES.INVENTORY, label: 'Нөөц', icon: '🔄' },
  { to: ROUTES.WAREHOUSE, label: 'Агуулах', icon: '🏭' },
  { to: ROUTES.REPORTS, label: 'Тайлан', icon: '📋' },
];

export default function Sidebar() {
  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
      <div className="border-b px-6 py-5">
        <h1 className="text-lg font-bold text-primary-700">УБТЗ</h1>
        <p className="text-xs text-slate-500">Материалын нөөц</p>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === ROUTES.DASHBOARD}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
