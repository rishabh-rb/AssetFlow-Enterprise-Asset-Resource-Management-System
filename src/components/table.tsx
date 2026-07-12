import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from '@tanstack/react-table';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Pagination } from './shared';
import { cn } from '../utils/cn';

export function DataTable<TData, TValue>({
  title,
  data,
  columns,
  pageSize = 5,
  stickyHeader = true,
}: {
  title: string;
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  pageSize?: number;
  stickyHeader?: boolean;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState(0);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination: { pageIndex, pageSize } },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const totalPages = table.getPageCount();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>{title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            {data.length} records
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead className={cn(stickyHeader && 'sticky top-0 z-10 bg-card') }>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="border-b border-border px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          className="inline-flex items-center gap-2"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() ? <ChevronsUpDown className="h-3.5 w-3.5" /> : null}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="transition hover:bg-muted/40">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border-b border-border px-4 py-4 text-sm text-foreground">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border p-4">
          <Pagination page={pageIndex + 1} totalPages={Math.max(totalPages, 1)} onChange={(nextPage) => setPageIndex(nextPage - 1)} />
        </div>
      </CardContent>
    </Card>
  );
}

export function TableSortLabel({ children, sorted }: { children: string; sorted?: 'asc' | 'desc' | false }) {
  return (
    <span className="inline-flex items-center gap-1">
      {children}
      <ChevronDown className={cn('h-3.5 w-3.5 transition', sorted === 'asc' && 'rotate-180')} />
    </span>
  );
}
