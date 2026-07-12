import { type ReactNode } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './shared';
import { mockReports } from '../data/mock';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

function ChartShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-80">{children}</CardContent>
    </Card>
  );
}

export function UtilizationChart() {
  return (
    <ChartShell title="Department Asset Utilization">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={mockReports.utilization}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip />
          <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="hsl(var(--chart-1))" />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function MaintenanceTrendChart() {
  return (
    <ChartShell title="Maintenance Trend">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockReports.maintenance}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="requests" stroke="hsl(var(--chart-1))" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="resolved" stroke="hsl(var(--chart-2))" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function AllocationChart() {
  return (
    <ChartShell title="Allocation Mix">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={mockReports.allocations} dataKey="value" nameKey="name" innerRadius={68} outerRadius={104} paddingAngle={3}>
            {mockReports.allocations.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function AssetForecastChart() {
  const data = mockReports.maintenance.map((entry) => ({
    month: entry.month,
    requests: entry.requests,
    resolved: entry.resolved,
    backlog: Math.max(entry.requests - entry.resolved, 0),
  }));

  return (
    <ChartShell title="Backlog Forecast">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip />
          <Area type="monotone" dataKey="backlog" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3) / 0.2)" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}
