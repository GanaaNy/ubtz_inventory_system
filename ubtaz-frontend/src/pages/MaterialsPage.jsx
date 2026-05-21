import { useState } from 'react';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useMaterials } from '../hooks/useMaterials';
import { formatNumber } from '../utils/formatters';

export default function MaterialsPage() {
  const { materials, loading, createMaterial } = useMaterials();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ code: '', name: '', unit: '', category: '', minStock: '' });

  const columns = [
    { key: 'code', label: 'Код' },
    { key: 'name', label: 'Нэр' },
    { key: 'unit', label: 'Нэгж' },
    { key: 'category', label: 'Ангилал' },
    { key: 'currentStock', label: 'Үлдэгдэл', render: (r) => formatNumber(r.currentStock) },
    {
      key: 'active',
      label: 'Төлөв',
      render: (r) => (
        <Badge variant={r.active ? 'success' : 'danger'}>{r.active ? 'Идэвхтэй' : 'Идэвхгүй'}</Badge>
      ),
    },
  ];

  const handleCreate = async () => {
    await createMaterial({ ...form, minStock: form.minStock ? Number(form.minStock) : 0, active: true });
    setModalOpen(false);
    setForm({ code: '', name: '', unit: '', category: '', minStock: '' });
  };

  if (loading) return <p className="text-slate-500">Ачаалж байна...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setModalOpen(true)}>+ Материал нэмэх</Button>
      </div>

      <Table columns={columns} data={materials} emptyMessage="Материал бүртгэгдээгүй байна" />

      <Modal
        open={modalOpen}
        title="Шинэ материал"
        onClose={() => setModalOpen(false)}
        onConfirm={handleCreate}
      >
        <div className="space-y-3">
          {['code', 'name', 'unit', 'category', 'minStock'].map((field) => (
            <div key={field}>
              <label className="mb-1 block text-sm text-slate-600">{field}</label>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
