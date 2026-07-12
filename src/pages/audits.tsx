import { appRoutes } from '../constants/routes';
import { Breadcrumbs, Badge, Button, Card, CardContent, PageContainer, PageHeader, Timeline } from '../components/shared';

export function AuditsPage() {
  return (
    <PageContainer>
      <PageHeader title="Audits" description="Run audit cycles with checklist progress, exceptions, and verification trails." breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Audits' }]} />} action={<Button>Start audit cycle</Button>} />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-4 md:grid-cols-3">
          {['Verified', 'Missing', 'Damaged'].map((label) => <Card key={label}><CardContent className="p-5"><div className="text-sm text-muted-foreground">Status</div><div className="mt-1 text-2xl font-semibold">{label === 'Verified' ? 84 : label === 'Missing' ? 3 : 2}</div><div className="mt-3"><Badge tone={label === 'Verified' ? 'success' : label === 'Missing' ? 'warning' : 'danger'}>{label}</Badge></div></CardContent></Card>)}
        </div>
        <Card><CardContent className="p-5"><Timeline items={[{ title: 'Cycle opened', description: 'Q3 verification cycle started.', time: '07:30 AM' }, { title: 'Floor audit completed', description: 'First floor assets verified.', time: '11:10 AM' }, { title: 'Exceptions assigned', description: 'Missing items routed to asset control.', time: '02:40 PM' }]} /></CardContent></Card>
      </div>
    </PageContainer>
  );
}
