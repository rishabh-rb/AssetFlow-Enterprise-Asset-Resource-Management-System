import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { authRoutes } from '../constants/routes';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '../components/shared';

const schema = z.object({
  fullName: z.string().min(3, 'Enter your full name'),
  employeeId: z.string().min(3, 'Enter your employee ID'),
  email: z.string().email('Enter a valid email address'),
  department: z.string().min(2, 'Enter your department'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormValues = z.infer<typeof schema>;

export function SignupPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async () => {
    setSubmitted(true);
  });

  return (
    <Card className="shadow-2xl shadow-slate-950/10">
      <CardHeader>
        <CardTitle className="text-3xl">Employee signup</CardTitle>
        <CardDescription>Create a new employee profile for access to AssetFlow.</CardDescription>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
            <div className="rounded-full bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-300">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Account created</h3>
              <p className="mt-1 text-sm text-muted-foreground">Your employee account is ready for login.</p>
            </div>
            <Link to={authRoutes.login} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-95">
              Continue to login <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <form className="grid gap-5" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label>Full name</Label>
              <Input placeholder="Jordan Taylor" {...register('fullName')} />
              {errors.fullName ? <p className="text-sm text-destructive">{errors.fullName.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label>Employee ID</Label>
              <Input placeholder="EMP-2048" {...register('employeeId')} />
              {errors.employeeId ? <p className="text-sm text-destructive">{errors.employeeId.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="employee@company.com" {...register('email')} />
              {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input placeholder="Operations" {...register('department')} />
              {errors.department ? <p className="text-sm text-destructive">{errors.department.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="Create a password" {...register('password')} />
              {errors.password ? <p className="text-sm text-destructive">{errors.password.message}</p> : null}
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create employee account'}
            </Button>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link className="font-medium text-primary hover:underline" to={authRoutes.login}>Sign in</Link>
        </p>
      </CardContent>
    </Card>
  );
}
