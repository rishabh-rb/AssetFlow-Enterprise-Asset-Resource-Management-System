import { appRoutes } from '../constants/routes';
import { Breadcrumbs, Badge, Card, CardContent, PageContainer, PageHeader } from '../components/shared';

const categories = [
  { name: 'Computing', items: 124, tone: 'info' as const },
  { name: 'Facilities', items: 82, tone: 'success' as const },
  { name: 'Operations', items: 61, tone: 'warning' as const },
  { name: 'Mobility', items: 39, tone: 'default' as const },
  { name: 'Audio/Video', items: 28, tone: 'neutral' as const },
  { name: 'Security', items: 17, tone: 'danger' as const },
];

export function CategoriesPage() {
  return (
    <PageContainer>
      <PageHeader title="Categories" description="Standardize the asset taxonomy used across the enterprise." breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Categories' }]} />} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.name}>
            <CardContent className="space-y-3 p-5">
              <div className="flex items-center justify-between"><h3 className="text-lg font-semibold">{category.name}</h3><Badge tone={category.tone}>{category.items} assets</Badge></div>
              <p className="text-sm text-muted-foreground">Maintain naming rules, warranty rules, and allocation behavior for this class of assets.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
