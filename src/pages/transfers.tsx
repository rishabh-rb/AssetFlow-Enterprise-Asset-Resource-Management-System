import { appRoutes } from '../constants/routes';
import { Breadcrumbs, Card, CardContent, PageContainer, PageHeader, Timeline } from '../components/shared';

export function TransfersPage() {
  return (
    <PageContainer>
      <PageHeader title="Transfers" description="Track asset movement between departments with chain-of-custody visibility." breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Transfers' }]} />} />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card><CardContent className="space-y-3 p-5"><div className="text-sm text-muted-foreground">Open transfers</div><div className="text-3xl font-semibold">7</div><div className="rounded-2xl border border-border bg-muted/30 p-4 text-sm">Transfer approvals, origin/destination owners, and delivery checkpoints.</div></CardContent></Card>
        <Card><CardContent className="p-5"><Timeline items={[{ title: 'Approved', description: 'Transfer approved by department owners.', time: '09:20 AM' }, { title: 'In transit', description: 'Courier pickup completed.', time: '11:00 AM' }, { title: 'Received', description: 'Destination team confirmed receipt.', time: '02:45 PM' }]} /></CardContent></Card>
      </div>
    </PageContainer>
  );
}
