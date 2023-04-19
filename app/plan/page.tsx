import { createPlans } from 'mint-works/dist/plans';
import { Plan } from './Plan';

export default function CardTray() {
  const plans = createPlans();
  return (
    <div className="grid grid-flow-row grid-cols-4 gap-4">
      {plans.map((plan) => {
        return <Plan key={plan.name} plan={plan} className="h-72" />;
      })}
    </div>
  );
}
