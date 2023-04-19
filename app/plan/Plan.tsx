import { Plan, PlanType } from 'mint-works/dist/plan';
import { CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

export function Plan({ plan, className }: { plan: Plan; className?: string }) {
  const { name, types, cost, description, baseStars } = plan;
  return (
    <div
      className={clsx(
        '[aspect-ratio: 0.6] flex h-full flex-col justify-between rounded bg-mintCard-background p-4 text-center shadow',
        className
      )}
    >
      <h3 className="rounded bg-mintCard-culture p-2">{plan.name}</h3>

      <div className="flex items-center justify-center">
        {[...Array(cost)].map((_, idx) => (
          <CurrencyDollarIcon key={idx} className="h-6 w-6" />
        ))}
      </div>

      <div className="h-full bg-mintCard-culture">
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
