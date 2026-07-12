import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { authRoutes } from '../constants/routes';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '../components/shared';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
});

type FormValues = z.infer<typeof schema>;

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async () => {
    setSent(true);
  });

  return (
    <Card className="shadow-2xl shadow-slate-950/10">
      <CardHeader>
        <CardTitle className="text-3xl">Reset password</CardTitle>
        <CardDescription>We’ll send password recovery instructions to your company email.</CardDescription>
      </CardHeader>
      <CardContent>
        {sent ? (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-sm text-emerald-700 dark:text-emerald-300">
            Password reset instructions have been sent. Check your inbox.
          </div>
        ) : (
          <form className="space-y-5" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="email" placeholder="name@company.com" className="pl-11" {...register('email')} />
              </div>
              {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send recovery link'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Back to <Link className="font-medium text-primary hover:underline" to={authRoutes.login}>sign in</Link>
        </p>
      </CardContent>
    </Card>
  );
}
