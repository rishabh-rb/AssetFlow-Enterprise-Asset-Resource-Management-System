import { useState } from 'react';
import { Tabs } from '../components/tabs';
import { DataTable } from '../components/table';
import { Avatar, Breadcrumbs, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, PageContainer, PageHeader, SearchBox, SectionCard, StatusBadge } from '../components/shared';
import { mockDepartments, mockUsers } from '../data/mock';
import { appRoutes } from '../constants/routes';
import type { ColumnDef } from '@tanstack/react-table';

export function OrganizationPage() {
  const [query, setQuery] = useState('');
  const filteredDepartments = mockDepartments.filter((department) => department.name.toLowerCase().includes(query.toLowerCase()));
  const filteredUsers = mockUsers.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()) || user.department.toLowerCase().includes(query.toLowerCase()));

  const departmentColumns: ColumnDef<(typeof mockDepartments)[number]>[] = [
    { accessorKey: 'name', header: 'Department' },
    { accessorKey: 'manager', header: 'Manager' },
    { accessorKey: 'headcount', header: 'Headcount' },
    { accessorKey: 'assets', header: 'Assets' },
    { accessorKey: 'budget', header: 'Budget' },
  ];

  const userColumns: ColumnDef<(typeof mockUsers)[number]>[] = [
    { accessorKey: 'name', header: 'Employee', cell: ({ row }) => <div className="flex items-center gap-3"><Avatar name={row.original.name} /><div><div className="font-medium">{row.original.name}</div><div className="text-xs text-muted-foreground">{row.original.email}</div></div></div> },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'department', header: 'Department' },
    { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Organization setup"
        description="Manage departments, categories, and employees in a structured enterprise control center."
        breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Organization' }]} />}
        action={<Button>New department</Button>}
      />

      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBox value={query} onChange={setQuery} placeholder="Search departments or employees" />
          <div className="flex items-center gap-3">
            <Button variant="outline">Import CSV</Button>
            <Button variant="outline">Export</Button>
          </div>
        </div>

        <Tabs
          items={[
            { id: 'departments', label: 'Departments', content: <DataTable title="Department management" data={filteredDepartments} columns={departmentColumns} /> },
            { id: 'categories', label: 'Asset categories', content: <SectionCard title="Asset categories" description="Maintain standardized classification for assets."><div className="grid gap-4 md:grid-cols-3"><Card className="bg-gradient-to-br from-primary/10 to-transparent"><CardContent className="space-y-2"><CardTitle>Computing</CardTitle><CardDescription>Laptops, desktops, peripherals</CardDescription><StatusBadge status="Available" /></CardContent></Card><Card className="bg-gradient-to-br from-emerald-500/10 to-transparent"><CardContent className="space-y-2"><CardTitle>Facilities</CardTitle><CardDescription>Furniture, office equipment</CardDescription><StatusBadge status="Allocated" /></CardContent></Card><Card className="bg-gradient-to-br from-amber-500/10 to-transparent"><CardContent className="space-y-2"><CardTitle>Operations</CardTitle><CardDescription>Meeting tools, logistics devices</CardDescription><StatusBadge status="Maintenance" /></CardContent></Card></div></SectionCard> },
            { id: 'employees', label: 'Employees', content: <DataTable title="Employee directory" data={filteredUsers} columns={userColumns} /> },
          ]}
        />
      </div>
    </PageContainer>
  );
}
