import type { ColumnDef } from '@tanstack/react-table';
import { appRoutes } from '../constants/routes';
import { mockDepartments } from '../data/mock';
import { Breadcrumbs, PageContainer, PageHeader } from '../components/shared';
import { DataTable } from '../components/table';

export function DepartmentsPage() {
  const columns: ColumnDef<(typeof mockDepartments)[number]>[] = [
    { accessorKey: 'name', header: 'Department' },
    { accessorKey: 'manager', header: 'Manager' },
    { accessorKey: 'headcount', header: 'Headcount' },
    { accessorKey: 'assets', header: 'Assets' },
    { accessorKey: 'budget', header: 'Budget' },
  ];

  return (
    <PageContainer>
      <PageHeader title="Departments" description="Monitor headcount, ownership, and resource allocation by department." breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Departments' }]} />} />
      <DataTable title="Department directory" data={mockDepartments} columns={columns} />
    </PageContainer>
  );
}
