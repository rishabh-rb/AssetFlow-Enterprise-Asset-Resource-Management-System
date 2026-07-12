import { useState } from 'react';
import { appRoutes } from '../constants/routes';
import { mockMaintenance } from '../data/mock';
import { Breadcrumbs, Button, Card, CardContent, CardHeader, CardTitle, Input, Label, PageContainer, PageHeader, StatusBadge, Timeline } from '../components/shared';

export function MaintenancePage() {
  const [request, setRequest] = useState('');

  return (
    <PageContainer>
      <PageHeader title="Maintenance" description="Raise requests, assign technicians, and track service execution with structured status visibility." breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Maintenance' }]} />} action={<Button>New request</Button>} />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader><CardTitle>Raise maintenance request</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2"><Label>Asset</Label><Input value={request} onChange={(event) => setRequest(event.target.value)} placeholder="iPhone 16 Pro" /></div>
            <div className="space-y-2"><Label>Priority</Label><Input placeholder="High" /></div>
            <div className="space-y-2"><Label>Technician</Label><Input placeholder="Samuel Reed" /></div>
            <div className="space-y-2 md:col-span-2"><Label>Issue</Label><textarea className="min-h-32 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none" placeholder="Describe the issue and any attached evidence" /></div>
            <div className="md:col-span-2 flex justify-end gap-3"><Button variant="outline">Attach files</Button><Button>Submit request</Button></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Service tracker</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {mockMaintenance.map((item) => <div key={item.id} className="rounded-2xl border border-border bg-card p-4"><div className="flex items-center justify-between"><div className="font-medium">{item.asset}</div><StatusBadge status={item.status} /></div><div className="mt-2 text-sm text-muted-foreground">{item.priority} priority · {item.technician}</div></div>)}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
