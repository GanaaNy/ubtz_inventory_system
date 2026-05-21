import Button from './Button';

export default function Modal({ open, title, children, onClose, onConfirm, confirmLabel = 'Хадгалах' }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            ✕
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {(onConfirm || onClose) && (
          <div className="flex justify-end gap-2 border-t px-6 py-4">
            <Button variant="ghost" onClick={onClose}>
              Цуцлах
            </Button>
            {onConfirm && (
              <Button variant="primary" onClick={onConfirm}>
                {confirmLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
