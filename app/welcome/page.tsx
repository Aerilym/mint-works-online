import Welcome from './Welcome';

export default async function Page() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h2> Welcome! Please pick a username </h2>
      {/* @ts-expect-error Async Server Component */}
      <Welcome />
    </div>
  );
}
