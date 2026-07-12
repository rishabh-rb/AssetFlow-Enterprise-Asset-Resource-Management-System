import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { appRoutes } from '../constants/routes';
import { Breadcrumbs, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, PageContainer, PageHeader, QRCard, BarcodeCard, UploadArea } from '../components/shared';

const schema = z.object({
  assetName: z.string().min(3, 'Asset name is required'),
  category: z.string().min(2, 'Category is required'),
  serialNumber: z.string().min(3, 'Serial number is required'),
  location: z.string().min(3, 'Location is required'),
  value: z.string().min(1, 'Value is required'),
});

type FormValues = z.infer<typeof schema>;

export function AssetRegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async () => setSubmitted(true));

  return (
    <PageContainer>
      <PageHeader title="Asset registration" description="Capture asset metadata, imagery, documents, and identification artifacts in one workflow." breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: appRoutes.dashboard }, { label: 'Assets', href: appRoutes.assets }, { label: 'Register asset' }]} />} />
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle>Asset information</CardTitle>
            <CardDescription>Complete the full registration form and attach supporting files.</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300">Asset registered successfully. Identification previews updated.</div> : null}
            <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
              {[
                ['assetName', 'Asset name'],
                ['category', 'Category'],
                ['serialNumber', 'Serial number'],
                ['location', 'Location'],
                ['value', 'Value'],
              ].map(([name, label]) => (
                <div key={name} className="space-y-2">
                  <Label>{label}</Label>
                  <Input {...register(name as keyof FormValues)} />
                  {errors[name as keyof FormValues] ? <p className="text-sm text-destructive">{errors[name as keyof FormValues]?.message}</p> : null}
                </div>
              ))}
              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <textarea className="min-h-28 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none" placeholder="Describe the asset and allocation rules" />
              </div>
              <div className="md:col-span-2 grid gap-4 lg:grid-cols-2">
                <UploadArea title="Upload image" description="Drag and drop asset images, receipts, or labels." />
                <UploadArea title="Upload documents" description="Attach warranty and procurement documents." />
              </div>
              <div className="md:col-span-2 flex justify-end gap-3">
                <Button type="button" variant="outline">Save draft</Button>
                <Button type="submit">Register asset</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <QRCard value="ASSETFLOW-QR-001" />
          <BarcodeCard value="ASSETFLOW-BAR-001" />
        </div>
      </div>
    </PageContainer>
  );
}
