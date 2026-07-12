import { useState, type ReactNode } from 'react';
import { cn } from '../utils/cn';
import { Card } from './shared';

export function Tabs({ items }: { items: { id: string; label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  return (
    <Card>
      <div className="border-b border-border p-2">
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={cn('rounded-xl px-4 py-2 text-sm font-medium transition', active === item.id ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted')}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-5">{items.find((item) => item.id === active)?.content}</div>
    </Card>
  );
}
