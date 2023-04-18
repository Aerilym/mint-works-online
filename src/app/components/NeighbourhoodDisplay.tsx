import { Typography, Tabs, Tab, Card, Grid } from '@mui/material';
import { Neighbourhood } from 'mint-works/dist/neighbourhood';
import PlanCard from './cards/PlanCard';

export default function NeighbourhoodDisplay({ neighbourhood }: { neighbourhood: Neighbourhood }) {
  return (
    <Grid container item xs={12}>
      <Grid container item xs={12}>
        <Typography variant="h6">Buildings</Typography>
      </Grid>
      <Grid container item xs={12}>
        {neighbourhood.buildings.map((building) => (
          <Grid item xs={3} key={building.name}>
            <PlanCard key={building.name} plan={building} />
          </Grid>
        ))}
      </Grid>
      <Grid container item xs={12}>
        <Typography variant="h6">Plans</Typography>
      </Grid>
      <Grid container item xs={12}>
        {neighbourhood.plans.map((plan) => (
          <Grid item xs={3} key={plan.name}>
            <PlanCard key={plan.name} plan={plan} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
