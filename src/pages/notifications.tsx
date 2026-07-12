import { useState } from 'react';
import { appRoutes } from '../constants/routes';
import { mockNotifications } from '../data/mock';
import { Breadcrumbs, Badge, Card, CardContent, PageContainer, PageHeader, SearchBox, NotificationCard } from '../components/shared';

export function NotificationsPage() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const filtered = mockNotifications.filter((notification) => [notification.title, notification.description, notification.group].join(' ').toLowerCase().includes(query.toLowerCase()) && (filter === 'All' || notification.group === filter));
  const groups = ['All', ...new Set(mockNotifications.map((notification) => notification.group))];

  return (
    <PageContainer>
      <PageHeader title="Notifications" description="Review grouped alerts with unread badges and category filters." breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Notifications' }]} />} />
      <div className="mb-4 space-y-4">
        <SearchBox value={query} onChange={setQuery} placeholder="Search notifications" />
        <div className="flex flex-wrap gap-2">{groups.map((group) => <button key={group} type="button" onClick={() => setFilter(group)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${filter === group ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:bg-muted'}`}>{group}</button>)}</div>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {filtered.map((notification) => <NotificationCard key={notification.id} title={notification.title} description={notification.description} time={notification.time} read={notification.read} />)}
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"><Badge tone="info">{filtered.length}</Badge> notifications matched the current filters.</div>
    </PageContainer>
  );
}
