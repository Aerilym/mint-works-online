'use client';
import { Grid } from '@mui/material';
import { Plan } from 'mint-works/dist/plan';
import PlanCard from './PlanCard';
import { createPlans } from 'mint-works/dist/plans';

export default function CardTray({ num }: { num: number }) {
  const plans = createPlans();
  const plansToDisplay = [plans[0], plans[10], plans[15]];
  return (
    <Grid item xs={12} container>
      {plansToDisplay.map((plan) => {
        return (
          <Grid item xs={3} key={plan.name}>
            <PlanCard plan={plan} />
          </Grid>
        );
      })}
    </Grid>
  );
}
