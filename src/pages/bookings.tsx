import { useState } from 'react';
import { appRoutes } from '../constants/routes';
import { mockBookings } from '../data/mock';
import { Breadcrumbs, Button, Card, CardContent, CardHeader, CardTitle, PageContainer, PageHeader, StatusBadge, Timeline, Input, Label } from '../components/shared';
import { MiniCalendar } from '../components/calendar';

export function BookingsPage() {
  const [query, setQuery] = useState('');
  const filtered = mockBookings.filter((booking) => [booking.title, booking.asset, booking.user, booking.status].join(' ').toLowerCase().includes(query.toLowerCase()));

  return (
    <PageContainer>
      <PageHeader title="Bookings" description="Manage resource reservations in a calendar-first workflow with conflict guidance." breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Bookings' }]} />} action={<Button>Create booking</Button>} />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader><CardTitle>Booking form</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Resource</Label><Input placeholder="Cisco Webex Room Kit" /></div>
            <div className="space-y-2"><Label>Requester</Label><Input placeholder="Ava Patel" /></div>
            <div className="space-y-2"><Label>Date</Label><Input type="date" /></div>
            <div className="space-y-2"><Label>Time</Label><Input placeholder="10:00 AM - 11:00 AM" /></div>
            <div className="md:col-span-2 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-300">Overlap warning: this time slot conflicts with an existing booking.</div>
            <div className="md:col-span-2 flex justify-end gap-3"><Button variant="outline">Save draft</Button><Button>Submit booking</Button></div>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <MiniCalendar />
          <Card>
            <CardHeader><CardTitle>Upcoming timeline</CardTitle></CardHeader>
            <CardContent><Timeline items={filtered.slice(0, 3).map((item) => ({ title: item.title, description: `${item.asset} · ${item.user}`, time: `${item.date} · ${item.time}` }))} /></CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-6 grid gap-3">
        {filtered.map((booking) => (
          <div key={booking.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 md:flex-row md:items-center md:justify-between">
            <div><div className="font-medium">{booking.title}</div><div className="text-sm text-muted-foreground">{booking.asset} · {booking.user} · {booking.date}</div></div>
            <StatusBadge status={booking.status} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
