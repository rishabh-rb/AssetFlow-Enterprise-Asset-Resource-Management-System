import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { appRoutes } from '../constants/routes';
import { mockAssets } from '../data/mock';
import { Avatar, Badge, Breadcrumbs, Button, Card, CardContent, EmptyState, PageContainer, PageHeader, SearchBox, StatusBadge } from '../components/shared';
import { Drawer } from '../components/drawer';
import { DataTable } from '../components/table';

function DetailsDrawer({ asset, onClose }: { asset: (typeof mockAssets)[number] | null; onClose: () => void }) {
  if (!asset) return null;
  return (
    <Drawer open onClose={onClose} title={asset.name} description={asset.category}>
      <div className="space-y-4">
        <div className="rounded-2xl border border-border bg-muted/40 p-4">
          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div><div className="text-muted-foreground">Serial</div><div className="font-medium">{asset.serialNumber}</div></div>
            <div><div className="text-muted-foreground">Location</div><div className="font-medium">{asset.location}</div></div>
            <div><div className="text-muted-foreground">Department</div><div className="font-medium">{asset.department}</div></div>
            <div><div className="text-muted-foreground">Condition</div><div className="font-medium">{asset.condition}</div></div>
          </div>
        </div>
        <Link to={appRoutes.assetDetails(asset.id)}><Button className="w-full">Open asset details</Button></Link>
      </div>
    </Drawer>
  );
}

export function AssetsPage() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<(typeof mockAssets)[number] | null>(null);
  const filtered = mockAssets.filter((asset) => [asset.name, asset.category, asset.department, asset.location, asset.status].join(' ').toLowerCase().includes(query.toLowerCase()));

  const columns: ColumnDef<(typeof mockAssets)[number]>[] = [
    { accessorKey: 'name', header: 'Asset', cell: ({ row }) => <button type="button" className="text-left" onClick={() => setSelected(row.original)}><div className="font-medium">{row.original.name}</div><div className="text-xs text-muted-foreground">{row.original.serialNumber}</div></button> },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'department', header: 'Department' },
    { accessorKey: 'location', header: 'Location' },
    { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
    { accessorKey: 'bookable', header: 'Bookable', cell: ({ row }) => <Badge tone={row.original.bookable ? 'success' : 'neutral'}>{row.original.bookable ? 'Yes' : 'No'}</Badge> },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Asset directory"
        description="Search, sort, and inspect enterprise assets from a single table with quick access to details."
        breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Assets' }]} />}
        action={<Link to={appRoutes.assetRegister}><Button>Register asset</Button></Link>}
      />
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBox value={query} onChange={setQuery} placeholder="Search assets, serial numbers, locations" />
        <div className="flex gap-3"><Button variant="outline">Filters</Button><Button variant="outline">Export</Button></div>
      </div>
      {filtered.length ? <DataTable title="Assets" data={filtered} columns={columns} /> : <EmptyState title="No assets found" description="Try a different search term or clear the filters." action={<Button onClick={() => setQuery('')}>Clear search</Button>} />}
      <DetailsDrawer asset={selected} onClose={() => setSelected(null)} />
    </PageContainer>
  );
}
