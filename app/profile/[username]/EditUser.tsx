'use client';
import { Button, Input } from '@/components';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Profile } from '@/app/types/database';

const formDataSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters!'),
});

type FormData = z.infer<typeof formDataSchema>;

export default function EditUser({ profile }: { profile: Profile }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
  });

  console.log(errors);

  const onSubmit = async (data: FormData) => {
    const res = await fetch(`/api/user/${profile.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (!res.ok) console.error(res);

    profile = await res.json();
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          className="uppercase"
          maxLength={12}
          defaultValue={profile.username ?? ''}
          {...register('username', {
            minLength: 3,
            maxLength: 12,
          })}
          aria-invalid={errors.username ? 'true' : 'false'}
        />
        <p className="text-sm text-red-700">{errors.username?.message}</p>
        <Button type="submit">Update Details</Button>
      </form>
    </div>
  );
}
