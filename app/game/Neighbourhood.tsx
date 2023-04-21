import type { Neighbourhood as MintWorksNeighbourhood } from 'mint-works/dist/neighbourhood';
import { Plan } from '@/app/plan/Plan';

interface NeighbourhoodProps {
  neighbourhood: MintWorksNeighbourhood;
}

export function Neighbourhood({ neighbourhood }: NeighbourhoodProps) {
  return (
    <div className="flex">
      <div className="flex">
        <h6>Buildings</h6>
      </div>
      <div className="flex">
        {neighbourhood.buildings.map((building) => (
          <Plan key={building.name} plan={building} />
        ))}
      </div>
      <div className="flex">
        <h6>Plans</h6>
      </div>
      <div className="flex">
        {neighbourhood.plans.map((plan) => (
          <Plan key={plan.name} plan={plan} />
        ))}
      </div>
    </div>
  );
}
