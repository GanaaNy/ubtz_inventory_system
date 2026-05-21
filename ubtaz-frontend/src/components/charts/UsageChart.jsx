import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function UsageChart({ data = [] }) {
  return (
    <div className="h-64 w-full rounded-xl border border-slate-200 bg-white p-4">
      <h4 className="mb-4 text-sm font-semibold text-slate-700">Орлого / Зарлага</h4>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="receipts" stroke="#22c55e" strokeWidth={2} name="Орлого" />
          <Line type="monotone" dataKey="issues" stroke="#ef4444" strokeWidth={2} name="Зарлага" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
