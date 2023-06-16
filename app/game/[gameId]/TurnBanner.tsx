import { Turn } from 'mint-works';

export const TurnBanner = ({ turn }: { turn: Turn }) => {
  return (
    <div className="flex flex-row gap-4">
      <p>{turn.action._type}</p>
      {renderTurnInfo(turn)}
    </div>
  );
};

function renderTurnInfo(turn: Turn) {
  switch (turn.action._type) {
    case 'Build':
    case 'Supply':
      return `${turn.action.plan.name} (${turn.action.plan.cost} tokens)`;
    case 'Leadership':
    case 'Lotto':
    case 'Wholesale':
    case 'Produce':
    case 'Pass':
    default:
      return '';
  }
}
