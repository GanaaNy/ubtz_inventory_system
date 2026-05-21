import { useEffect, useState } from 'react';
import StatCard from '../components/ui/StatCard';
import InventoryChart from '../components/charts/InventoryChart';
import UsageChart from '../components/charts/UsageChart';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import * as reportService from '../services/reportService';
import { formatNumber } from '../utils/formatters';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reportService.getDashboardStats().then(setStats).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-slate-500">Ачаалж байна...</p>;
  }

  const chartData = (stats?.lowStockMaterials || []).map((m) => ({
    name: m.code,
    stock: Number(m.currentStock) || 0,
  }));

  const usageData = [
    { date: 'Даваа', receipts: stats?.receiptsToday || 0, issues: 0 },
    { date: 'Мягмар', receipts: 0, issues: stats?.issuesToday || 0 },
    { date: 'Лхагва', receipts: 2, issues: 1 },
    { date: 'Пүрэв', receipts: 1, issues: 3 },
  ];

  const lowStockColumns = [
    { key: 'code', label: 'Код' },
    { key: 'name', label: 'Нэр' },
    { key: 'currentStock', label: 'Үлдэгдэл', render: (r) => formatNumber(r.currentStock) },
    { key: 'minStock', label: 'Доод хэмжээ', render: (r) => formatNumber(r.minStock) },
    {
      key: 'status',
      label: 'Төлөв',
      render: () => <Badge variant="warning">Бага</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Нийт материал" value={stats?.totalMaterials ?? 0} icon="📦" />
        <StatCard title="Бага нөөц" value={stats?.lowStockCount ?? 0} icon="⚠️" variant="warning" />
        <StatCard title="Өнөөдрийн орлого" value={stats?.receiptsToday ?? 0} icon="📥" />
        <StatCard title="Өнөөдрийн зарлага" value={stats?.issuesToday ?? 0} icon="📤" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <InventoryChart data={chartData} />
        <UsageChart data={usageData} />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-slate-700">Бага нөөцтэй материал</h3>
        <Table columns={lowStockColumns} data={stats?.lowStockMaterials || []} emptyMessage="Бага нөөцтэй материал байхгүй" />
      </div>
    </div>
  );
}
