import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { authRoutes } from '../constants/routes';
import { useAppContext } from '../contexts/app-context';
import { mockUsers } from '../data/mock';
import { Avatar, Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '../components/shared';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppContext();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: mockUsers[0].email, password: 'AssetFlow123', rememberMe: true },
  });

  const onSubmit = handleSubmit(async (values) => {
    const user = mockUsers.find((entry) => entry.email === values.email) ?? mockUsers[0];
    setCurrentUser(user);
    navigate('/dashboard');
  });

  return (
    <Card className="shadow-2xl shadow-slate-950/10">
      <CardHeader>
        <Badge tone="info" className="w-fit">Secure Access</Badge>
        <CardTitle className="mt-2 text-3xl">Welcome back</CardTitle>
        <CardDescription>Sign in to manage assets, allocations, bookings, and maintenance operations.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="email" placeholder="name@company.com" className="pl-11" {...register('email')} />
            </div>
            {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="password" placeholder="Enter your password" className="pl-11" {...register('password')} />
            </div>
            {errors.password ? <p className="text-sm text-destructive">{errors.password.message}</p> : null}
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" {...register('rememberMe')} className="rounded border-border text-primary focus:ring-primary" />
              Remember me
            </label>
            <Link className="font-medium text-primary hover:underline" to={authRoutes.forgotPassword}>Forgot password?</Link>
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-4">
          <div className="flex items-center gap-3">
            <Avatar name={mockUsers[0].name} />
            <div>
              <div className="text-sm font-medium">Demo user ready</div>
              <div className="text-xs text-muted-foreground">Use any seeded employee email to continue.</div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          New employee? <Link to={authRoutes.signup} className="font-medium text-primary hover:underline">Create an account</Link>
        </p>
      </CardContent>
    </Card>
  );
}
