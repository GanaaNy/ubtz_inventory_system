import Button from '../ui/Button';

export default function Header({ title, user, onLogout }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <div className="flex items-center gap-4">
        {user && (
          <div className="text-right text-sm">
            <p className="font-medium text-slate-800">{user.fullName}</p>
            <p className="text-xs text-slate-500">{user.role}</p>
          </div>
        )}
        <Button variant="ghost" onClick={onLogout}>
          Гарах
        </Button>
      </div>
    </header>
  );
}
