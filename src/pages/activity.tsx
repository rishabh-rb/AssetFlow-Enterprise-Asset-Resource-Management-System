import { useState } from 'react';
import { appRoutes } from '../constants/routes';
import { mockActivity } from '../data/mock';
import { Breadcrumbs, Card, CardContent, PageContainer, PageHeader, SearchBox, Timeline } from '../components/shared';
import { DataTable } from '../components/table';
import type { ColumnDef } from '@tanstack/react-table';

export function ActivityPage() {
  const [query, setQuery] = useState('');
  const filtered = mockActivity.filter((item) => [item.title, item.description, item.type].join(' ').toLowerCase().includes(query.toLowerCase()));

  const columns: ColumnDef<(typeof mockActivity)[number]>[] = [
    { accessorKey: 'time', header: 'Time' },
    { accessorKey: 'title', header: 'Event' },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'type', header: 'Type' },
  ];

  return (
    <PageContainer>
      <PageHeader title="Activity logs" description="Audit operational actions across assets, bookings, maintenance, and system events." breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Activity' }]} />} />
      <div className="mb-4"><SearchBox value={query} onChange={setQuery} placeholder="Search activity logs" /></div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <DataTable title="Activity table" data={filtered} columns={columns} />
        <Card><CardContent className="p-5"><Timeline items={filtered.slice(0, 4).map((item) => ({ title: item.title, description: item.description, time: item.time }))} /></CardContent></Card>
      </div>
    </PageContainer>
  );
}
