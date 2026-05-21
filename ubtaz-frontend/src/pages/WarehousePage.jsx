import StatCard from '../components/ui/StatCard';

const warehouses = [
  { code: 'WH-01', name: 'Төв агуулах', location: 'Улаанбаатар', stations: 2 },
  { code: 'WH-02', name: 'Бүсийн агуулах', location: 'Дархан', stations: 0 },
];

export default function WarehousePage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Агуулах" value={warehouses.length} />
        <StatCard title="Станц" value={2} />
        <StatCard title="Хэсэг" value={2} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {warehouses.map((wh) => (
          <div key={wh.code} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">{wh.code}</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{wh.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{wh.location}</p>
              </div>
              <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                {wh.stations} станц
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
