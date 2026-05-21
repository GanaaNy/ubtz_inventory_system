import { useState } from 'react';
import Button from '../components/ui/Button';
import StatCard from '../components/ui/StatCard';
import * as reportService from '../services/reportService';
import { formatNumber } from '../utils/formatters';

export default function ReportsPage() {
  const [stats, setStats] = useState(null);
  const [generating, setGenerating] = useState(false);

  const loadStats = () => {
    reportService.getDashboardStats().then(setStats);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await reportService.generateReport('STOCK_SUMMARY', 'Нөөцийн тайлан');
      loadStats();
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <Button onClick={loadStats}>Статистик ачаалах</Button>
        <Button variant="secondary" onClick={handleGenerate} disabled={generating}>
          {generating ? 'Үүсгэж байна...' : 'Тайлан үүсгэх'}
        </Button>
      </div>

      {stats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Нийт материал" value={stats.totalMaterials} />
          <StatCard title="Бага нөөц" value={stats.lowStockCount} />
          <StatCard title="Нийт үлдэгдэл" value={formatNumber(stats.totalStockValue)} />
          <StatCard title="Өнөөдрийн гүйлгээ" value={(stats.receiptsToday || 0) + (stats.issuesToday || 0)} />
        </div>
      )}
    </div>
  );
}
