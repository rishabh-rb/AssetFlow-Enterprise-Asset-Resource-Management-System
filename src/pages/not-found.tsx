import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { appRoutes } from '../constants/routes';
import { Button, Card, CardContent } from '../components/shared';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="max-w-lg">
        <CardContent className="flex flex-col items-center gap-4 py-14 text-center">
          <div className="text-6xl font-semibold tracking-tight text-primary">404</div>
          <div>
            <h1 className="text-2xl font-semibold">Page not found</h1>
            <p className="mt-2 text-sm text-muted-foreground">The page you requested does not exist or has been moved.</p>
          </div>
          <Link to={appRoutes.dashboard} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-95">
            <ArrowLeft className="h-4 w-4" />Back to dashboard
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
