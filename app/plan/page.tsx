import { createPlans } from 'mint-works';

import { Plan } from './Plan';

export default function Page() {
  const plans = createPlans();
  return (
    <div className="grid grid-flow-row grid-cols-4 gap-4">
      {plans.map((plan) => {
        return <Plan key={plan.name} plan={plan} />;
      })}
    </div>
  );
}
