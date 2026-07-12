import type { ColumnDef } from '@tanstack/react-table';
import { appRoutes } from '../constants/routes';
import { mockUsers } from '../data/mock';
import { Avatar, Breadcrumbs, PageContainer, PageHeader, StatusBadge } from '../components/shared';
import { DataTable } from '../components/table';

export function EmployeesPage() {
  const columns: ColumnDef<(typeof mockUsers)[number]>[] = [
    { accessorKey: 'name', header: 'Employee', cell: ({ row }) => <div className="flex items-center gap-3"><Avatar name={row.original.name} /><div><div className="font-medium">{row.original.name}</div><div className="text-xs text-muted-foreground">{row.original.email}</div></div></div> },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'department', header: 'Department' },
    { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  ];

  return (
    <PageContainer>
      <PageHeader title="Employees" description="Browse active employees across the organization." breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Employees' }]} />} />
      <DataTable title="Employee directory" data={mockUsers} columns={columns} />
    </PageContainer>
  );
}
