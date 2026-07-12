import { useParams } from 'react-router-dom';
import { appRoutes } from '../constants/routes';
import { mockAssets } from '../data/mock';
import { Avatar, Badge, Breadcrumbs, Button, Card, CardContent, CardHeader, CardTitle, PageContainer, PageHeader, QRCard, BarcodeCard, SectionCard, StatusBadge, Timeline } from '../components/shared';

export function AssetDetailsPage() {
  const { id } = useParams();
  const asset = mockAssets.find((entry) => entry.id === id) ?? mockAssets[0];

  return (
    <PageContainer>
      <PageHeader title={asset.name} description="Detailed asset record with allocation, maintenance, and traceability history." breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Assets', href: appRoutes.assets }, { label: asset.name }]} />} action={<Button>Edit asset</Button>} />
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Asset overview</CardTitle></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-muted/30 p-4"><div className="text-sm text-muted-foreground">Serial number</div><div className="font-medium">{asset.serialNumber}</div></div>
              <div className="rounded-2xl border border-border bg-muted/30 p-4"><div className="text-sm text-muted-foreground">Department</div><div className="font-medium">{asset.department}</div></div>
              <div className="rounded-2xl border border-border bg-muted/30 p-4"><div className="text-sm text-muted-foreground">Condition</div><div className="font-medium">{asset.condition}</div></div>
              <div className="rounded-2xl border border-border bg-muted/30 p-4"><div className="text-sm text-muted-foreground">Warranty</div><div className="font-medium">{asset.warranty}</div></div>
              <div className="rounded-2xl border border-border bg-muted/30 p-4"><div className="text-sm text-muted-foreground">Location</div><div className="font-medium">{asset.location}</div></div>
              <div className="rounded-2xl border border-border bg-muted/30 p-4"><div className="text-sm text-muted-foreground">Bookable</div><Badge tone={asset.bookable ? 'success' : 'neutral'}>{asset.bookable ? 'Yes' : 'No'}</Badge></div>
            </CardContent>
          </Card>
          <SectionCard title="Lifecycle timeline" description="Allocation, transfers, maintenance, and audit events.">
            <Timeline items={[{ title: 'Allocated to Finance', description: 'Asset assigned to Ava Patel.', time: '2026-05-10' }, { title: 'Maintenance completed', description: 'Battery replacement completed.', time: '2026-06-18' }, { title: 'Audit verified', description: 'Physical record matched the tag.', time: '2026-07-02' }]} />
          </SectionCard>
          <SectionCard title="Maintenance history"><div className="space-y-3"><div className="rounded-2xl border border-border p-4"><div className="font-medium">Battery service</div><div className="text-sm text-muted-foreground">Completed by Samuel Reed on 2026-06-18</div></div><div className="rounded-2xl border border-border p-4"><div className="font-medium">Screen inspection</div><div className="text-sm text-muted-foreground">No issues found during quarterly inspection</div></div></div></SectionCard>
          <SectionCard title="Allocation history"><div className="space-y-3"><div className="rounded-2xl border border-border p-4"><div className="font-medium">Operations to Finance</div><div className="text-sm text-muted-foreground">Moved to Ava Patel after budget approval.</div></div><div className="rounded-2xl border border-border p-4"><div className="font-medium">Central pool assignment</div><div className="text-sm text-muted-foreground">Issued from shared asset pool.</div></div></div></SectionCard>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Identity and media</CardTitle></CardHeader>
            <CardContent className="space-y-4"><Avatar name={asset.name} className="h-20 w-20 text-lg" /><div className="rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-sm text-muted-foreground">Asset imagery, procurement documents, and receipts appear here.</div></CardContent>
          </Card>
          <QRCard value={asset.serialNumber} />
          <BarcodeCard value={asset.serialNumber} />
        </div>
      </div>
    </PageContainer>
  );
}
