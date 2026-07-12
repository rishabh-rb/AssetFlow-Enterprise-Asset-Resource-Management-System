import { useState } from 'react';
import { appRoutes } from '../constants/routes';
import { useAppContext } from '../contexts/app-context';
import { Avatar, Breadcrumbs, Button, Card, CardContent, CardHeader, CardTitle, Input, Label, PageContainer, PageHeader, UploadArea } from '../components/shared';

export function ProfilePage() {
  const { currentUser } = useAppContext();
  const [name, setName] = useState(currentUser.name);

  return (
    <PageContainer>
      <PageHeader title="Profile" description="Update personal information, avatar, and security preferences." breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Profile' }]} />} action={<Button>Save changes</Button>} />
      <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
        <Card>
          <CardHeader><CardTitle>Avatar</CardTitle></CardHeader>
          <CardContent className="space-y-4"><Avatar name={name} className="h-24 w-24 text-xl" /><UploadArea title="Upload avatar" description="PNG or JPG, up to 2MB." /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Personal information</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Full name</Label><Input value={name} onChange={(event) => setName(event.target.value)} /></div>
            <div className="space-y-2"><Label>Email</Label><Input value={currentUser.email} readOnly /></div>
            <div className="space-y-2"><Label>Department</Label><Input value={currentUser.department} readOnly /></div>
            <div className="space-y-2"><Label>Role</Label><Input value={currentUser.role} readOnly /></div>
            <div className="md:col-span-2 space-y-2"><Label>Password change</Label><div className="grid gap-3 md:grid-cols-3"><Input type="password" placeholder="Current password" /><Input type="password" placeholder="New password" /><Input type="password" placeholder="Confirm password" /></div></div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
