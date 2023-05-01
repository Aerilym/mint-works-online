'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Avatar, Button, Input } from '@/components';
import { Profile } from '@/types/database';

const formDataSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters!'),
});

type FormData = z.infer<typeof formDataSchema>;

export default function EditUser({
  profile,
  blankUsername,
}: {
  profile: Profile;
  blankUsername?: boolean;
}) {
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
          defaultValue={blankUsername ? '' : profile.username ?? ''}
          {...register('username', {
            minLength: 3,
            maxLength: 12,
          })}
          aria-invalid={errors.username ? 'true' : 'false'}
        />
        <p className="text-sm text-red-700">{errors.username?.message}</p>
        <Button type="submit">Update Details</Button>
      </form>
      <Avatar
        src={`/api/profile/${profile.username}/avatar`}
        alt={`Profile picture for ${profile.username}`}
      />
      We use Gravatar for profile pictures.
      <a href="https://gravatar.com/">
        <Button>Gravatar</Button>
      </a>
    </div>
  );
}
