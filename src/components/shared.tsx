import { Fragment, type ButtonHTMLAttributes, type InputHTMLAttributes, type LabelHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Barcode,
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  ImageIcon,
  MoreHorizontal,
  QrCode,
  Search,
  ShieldAlert,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';
import { cn } from '../utils/cn';

export function PageContainer({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8', className)}>{children}</div>;
}

export function PageHeader({
  title,
  description,
  action,
  breadcrumbs,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  breadcrumbs?: ReactNode;
}) {
  return (
    <div className="mb-6 space-y-4">
      {breadcrumbs}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            AssetFlow Enterprise ERP
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h1>
          {description ? <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">{description}</p> : null}
        </div>
        {action}
      </div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {item.href ? (
            <Link to={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
          )}
          {index < items.length - 1 ? <ChevronRight className="h-4 w-4" /> : null}
        </Fragment>
      ))}
    </nav>
  );
}

export function Button({ className, variant = 'default', size = 'md', asChild, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}) {
  const Comp = asChild ? 'span' : 'button';
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
        size === 'sm' && 'h-9 px-3 text-sm',
        size === 'md' && 'h-10 px-4 text-sm',
        size === 'lg' && 'h-12 px-5 text-base',
        variant === 'default' && 'bg-primary text-primary-foreground shadow-sm hover:opacity-95',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        variant === 'outline' && 'border border-border bg-transparent hover:bg-muted',
        variant === 'ghost' && 'bg-transparent hover:bg-muted',
        variant === 'destructive' && 'bg-destructive text-destructive-foreground hover:opacity-95',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring', props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn('min-h-28 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-ring', props.className)} />;
}

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className={cn('text-sm font-medium leading-none text-foreground', className)} />;
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('surface overflow-hidden', className)}>{children}</div>;
}

export function CardHeader({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('border-b border-border px-5 py-4', className)}>{children}</div>;
}

export function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('p-5', className)}>{children}</div>;
}

export function CardFooter({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('border-t border-border px-5 py-4', className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return <h3 className={cn('text-base font-semibold text-foreground', className)}>{children}</h3>;
}

export function CardDescription({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>;
}

export function Badge({ className, tone = 'default', children }: { className?: string; tone?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'; children: ReactNode }) {
  const tones = {
    default: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-300',
    warning: 'bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-300',
    danger: 'bg-rose-500/10 text-rose-700 border-rose-500/20 dark:text-rose-300',
    info: 'bg-sky-500/10 text-sky-700 border-sky-500/20 dark:text-sky-300',
    neutral: 'bg-muted text-muted-foreground border-border',
  };
  return <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium', tones[tone], className)}>{children}</span>;
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const tone = normalized.includes('available') || normalized.includes('resolved') || normalized.includes('completed') ? 'success' : normalized.includes('maintenance') || normalized.includes('pending') || normalized.includes('open') ? 'warning' : normalized.includes('critical') || normalized.includes('cancelled') || normalized.includes('damaged') ? 'danger' : 'neutral';
  return <Badge tone={tone as any}>{status}</Badge>;
}

export function Avatar({ name, image, className }: { name: string; image?: string; className?: string }) {
  return (
    <div className={cn('flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-semibold text-primary', className)}>
      {image ? <img src={image} alt={name} className="h-full w-full object-cover" /> : name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-2xl bg-muted/70', className)} />;
}

export function EmptyState({
  title,
  description,
  action,
  icon = <ImageIcon className="h-5 w-5" />,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">{icon}</div>
        <div className="max-w-md space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {action}
      </CardContent>
    </Card>
  );
}

export function ErrorState({ title, description, onRetry }: { title: string; description: string; onRetry?: () => void }) {
  return (
    <Card className="border-rose-200/60 bg-rose-50/50 dark:border-rose-500/20 dark:bg-rose-500/10">
      <CardContent className="flex items-start gap-4">
        <div className="rounded-xl bg-rose-500/10 p-2 text-rose-600 dark:text-rose-300">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {onRetry ? (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Retry
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function SearchBox({ value, onChange, placeholder = 'Search...' }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="pl-11" />
    </div>
  );
}

export function FilterPanel({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-3">{children}</div>;
}

export function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (page: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3">
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function Timeline({ items }: { items: { title: string; description: string; time: string; tone?: string }[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={`${item.title}-${item.time}`} className="relative pl-5">
          <div className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-primary" />
          <div className="absolute left-1.25 top-4 h-full w-px bg-border" />
          <div className="space-y-1 rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <h4 className="font-medium">{item.title}</h4>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function UploadArea({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-8 text-center">
      <div className="rounded-2xl bg-primary/10 p-3 text-primary">
        <Upload className="h-5 w-5" />
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function QRCard({ value }: { value: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-6 text-center">
        <QrCode className="h-14 w-14 text-primary" />
        <div>
          <h4 className="font-medium">QR Code Preview</h4>
          <p className="text-xs text-muted-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function BarcodeCard({ value }: { value: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-6 text-center">
        <Barcode className="h-14 w-14 text-primary" />
        <div>
          <h4 className="font-medium">Barcode Preview</h4>
          <p className="text-xs text-muted-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function NotificationCard({ title, description, time, read }: { title: string; description: string; time: string; read: boolean }) {
  return (
    <div className={cn('flex items-start gap-3 rounded-2xl border p-4 transition hover:shadow-sm', read ? 'border-border bg-card' : 'border-primary/20 bg-primary/5')}>
      <div className={cn('mt-0.5 rounded-full p-2', read ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary')}>
        <Bell className="h-4 w-4" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-3">
          <h4 className="font-medium">{title}</h4>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function ActivityCard({ title, description, time }: { title: string; description: string; time: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="rounded-full bg-primary/10 p-2 text-primary">
        <Check className="h-4 w-4" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-3">
          <h4 className="font-medium">{title}</h4>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function HeroActionLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-95">
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function SectionCard({ title, description, action, children }: { title: string; description?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>{title}</CardTitle>
            {description ? <CardDescription>{description}</CardDescription> : null}
          </div>
          {action}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function iconForType(type: string) {
  if (type === 'asset') return FileText;
  if (type === 'booking') return MoreHorizontal;
  if (type === 'maintenance') return Download;
  if (type === 'audit') return Check;
  return BarChart3;
}
