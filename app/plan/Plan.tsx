import { Plan, PlanType } from 'mint-works/dist/plan';
import { CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export function Plan({ plan, className }: { plan: Plan; className?: string }) {
  const { name, types, cost, description, baseStars } = plan;
  let color = '';
  switch (types[0] ?? '') {
    case 'Culture':
      color = 'bg-mintCard-culture';
      break;
    case 'Deed':
      color = 'bg-mintCard-deed';
      break;
    case 'Production':
      color = 'bg-mintCard-production';
      break;
    case 'Utility':
      color = 'bg-mintCard-utility';
      break;
  }

  return (
    <div
      className={clsx(
        'flex aspect-[0.6] flex-col justify-between rounded  p-4 text-center shadow',
        className
      )}
    >
      <h3 className={clsx('rounded p-2', color)}>{plan.name}</h3>

      <div className="flex items-center justify-center">
        {[...Array(cost)].map((_, idx) => (
          <CurrencyDollarIcon key={idx} className="h-6 w-6" />
        ))}
      </div>

      <div className={clsx('h-full p-2', color)}>
        <div className="flex h-full flex-col justify-between">
          {/** Replace all occurrences of :TOKEN: with <PaidIcon/> and :STAR: with <StarIcon/>*/}
          <p>
            {description
              ? description
                  .split(' ')
                  .map((word) =>
                    word === ':TOKEN:' ? (
                      <CurrencyDollarIcon key={word} className="inline h-6 w-6" />
                    ) : word === ':STAR:' ? (
                      <StarIcon key={word} className="inline h-6 w-6" />
                    ) : (
                      `${word} `
                    )
                  )
              : ''}
          </p>

          <div className="flex items-center justify-center">
            {[...Array(baseStars)].map((_, idx) => (
              <StarIcon key={idx} className="h-6 w-6" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
