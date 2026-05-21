import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import { useInventory } from '../hooks/useInventory';
import { formatDate, formatNumber } from '../utils/formatters';

export default function InventoryPage() {
  const { transactions, loading } = useInventory();

  const columns = [
    { key: 'transactionDate', label: 'Огноо', render: (r) => formatDate(r.transactionDate) },
    {
      key: 'transactionType',
      label: 'Төрөл',
      render: (r) => (
        <Badge variant={r.transactionType === 'RECEIPT' ? 'success' : 'danger'}>
          {r.transactionType === 'RECEIPT' ? 'Орлого' : 'Зарлага'}
        </Badge>
      ),
    },
    { key: 'materialCode', label: 'Код' },
    { key: 'materialName', label: 'Материал' },
    { key: 'warehouseName', label: 'Агуулах' },
    { key: 'quantity', label: 'Тоо', render: (r) => formatNumber(r.quantity) },
    { key: 'performedBy', label: 'Гүйцэтгэгч' },
  ];

  if (loading) return <p className="text-slate-500">Ачаалж байна...</p>;

  return (
    <Table columns={columns} data={transactions} emptyMessage="Гүйлгээ байхгүй байна" />
  );
}
