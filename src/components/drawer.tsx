import { type ReactNode } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from './shared';

export function Drawer({ open, title, description, children, onClose }: { open: boolean; title: string; description?: string; children: ReactNode; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-slate-950/40" onClick={onClose} />
          <motion.div initial={{ x: 420 }} animate={{ x: 0 }} exit={{ x: 420 }} className="absolute right-0 top-0 h-full w-full max-w-md p-3">
            <Card className="flex h-full flex-col overflow-hidden">
              <div className="flex items-start justify-between border-b border-border p-5">
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}><X className="h-4 w-4" /></Button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">{children}</div>
            </Card>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
