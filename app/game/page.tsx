'use client';
import { Button, Input } from '@/components';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formDataSchema = z.object({
  gameId: z.string().length(4, 'The lobby code must be exactly 4 characters!'),
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

  const onSubmit = (data: FormData) => router.push(`/game/${data.gameId}`);

  return (
    <div className="flex flex-col items-center gap-8">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          className="uppercase"
          maxLength={4}
          {...register('gameId', {
            minLength: 4,
            maxLength: 4,
          })}
          aria-invalid={errors.gameId ? 'true' : 'false'}
        />
        <p className="text-sm text-red-700">{errors.gameId?.message}</p>
        <Button type="submit">Join an existing game</Button>
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
