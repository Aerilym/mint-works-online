import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { Plan } from 'mint-works/dist/plan';

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <Card
      style={{
        height: '100%',
      }}
    >
      <CardHeader title={plan.name} subheader={plan.types.join(' ')} />
      <Divider variant="middle" />
      <Typography variant="body1">{plan.cost}</Typography>
      <Divider variant="middle" />

      <CardContent>
        <Typography variant="body1">{plan.description}</Typography>
        <Typography variant="body1">{plan.baseStars}</Typography>
      </CardContent>
    </Card>
  );
}
