'use client';
import { Button, Input } from '@/components';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formDataSchema = z.object({
  joinCode: z.string().length(6, 'The lobby code must be exactly 6 characters!'),
});

type FormData = z.infer<typeof formDataSchema>;

export default function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
  });

  console.log(errors);

  const onSubmit = (data: FormData) => router.push(`/lobby/${data.joinCode}`);

  return (
    <div className="flex flex-col items-center gap-8">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          className="uppercase"
          maxLength={6}
          {...register('joinCode', {
            minLength: 6,
            maxLength: 6,
          })}
          aria-invalid={errors.joinCode ? 'true' : 'false'}
        />
        <p className="text-sm text-red-700">{errors.joinCode?.message}</p>
        <Button type="submit">Join a game lobby</Button>
      </form>

      <p>
        <i>or...</i>
      </p>

      <Link href="/game/new">
        <Button>Create a new game</Button>
      </Link>
    </div>
  );
}
