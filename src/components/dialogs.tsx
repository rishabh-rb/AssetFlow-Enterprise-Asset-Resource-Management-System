import { X } from 'lucide-react';
import { Button, Card } from './shared';

export function ConfirmationDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <Card className="w-full max-w-md">
        <div className="flex items-start justify-between border-b border-border p-5">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <button onClick={onClose} aria-label="Close dialog"><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>
        <div className="flex justify-end gap-3 p-5">
          <Button variant="outline" onClick={onClose}>{cancelLabel}</Button>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </Card>
    </div>
  );
}
