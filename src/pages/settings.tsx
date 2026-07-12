import { appRoutes } from '../constants/routes';
import { useAppContext } from '../contexts/app-context';
import { Breadcrumbs, Button, Card, CardContent, CardHeader, CardTitle, Input, Label, PageContainer, PageHeader } from '../components/shared';

export function SettingsPage() {
  const { theme, setTheme } = useAppContext();

  return (
    <PageContainer>
      <PageHeader title="Settings" description="Adjust theme, language, and notification behavior for your workspace." breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Settings' }]} />} action={<Button>Save settings</Button>} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Theme</Label><div className="flex gap-3"><Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}>Light</Button><Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}>Dark</Button></div></div>
            <div className="space-y-2"><Label>Language</Label><Input defaultValue="English" /></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {['Asset movement alerts', 'Booking reminders', 'Maintenance escalations', 'Audit exceptions'].map((item) => <label key={item} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 text-sm"><span>{item}</span><input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary" /></label>)}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
