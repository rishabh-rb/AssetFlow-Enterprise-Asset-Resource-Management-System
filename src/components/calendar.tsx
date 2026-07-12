import { eachDayOfInterval, endOfMonth, format, getDay, isSameDay, startOfMonth, startOfWeek } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from './shared';
import { cn } from '../utils/cn';

const bookingDays = ['2026-07-10', '2026-07-11', '2026-07-13', '2026-07-14'];

export function MiniCalendar() {
  const currentMonth = new Date('2026-07-01T00:00:00');
  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end: new Date(end.getTime() + 7 * 24 * 60 * 60 * 1000) });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar view</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>{format(currentMonth, 'MMMM yyyy')}</span>
          <span>Bookings highlighted</span>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-muted-foreground">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => <div key={day}>{day}</div>)}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-2">
          {days.map((day) => {
            const inMonth = day.getMonth() === currentMonth.getMonth();
            const booked = bookingDays.some((value) => isSameDay(day, new Date(value)));
            return (
              <div key={day.toISOString()} className={cn('flex h-14 flex-col items-center justify-center rounded-xl border text-sm', inMonth ? 'border-border bg-card' : 'border-transparent bg-transparent text-muted-foreground/50', booked && 'border-primary bg-primary/10 text-primary')}>
                <span>{format(day, 'd')}</span>
                {booked ? <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" /> : null}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
