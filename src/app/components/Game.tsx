'use client';
import { GameEngine } from '@/app/services/game';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  RadioProps,
  TextField,
  Typography,
} from '@mui/material';
import { Turn } from 'mint-works/dist/turn';
import { useEffect, useMemo, useRef, useState } from 'react';
import PlanCard from './cards/PlanCard';
import Players from './Players';
import NeighbourhoodDisplay from './NeighbourhoodDisplay';
import { PlayerWithInformation } from 'mint-works/dist/mint_works';

function ButtonTurnRadio({
  turn,
  currentPlayer,
  checked,
}: {
  turn: Turn;
  currentPlayer?: PlayerWithInformation;
  checked?: boolean;
}) {
  const actionName = turn.action._type;
  const plan = 'plan' in turn.action ? turn.action.plan : undefined;
  let text = `${actionName}`;
  if (plan) {
    if (actionName === 'Supply') {
      text += ` - ${plan.name} (-${plan.cost} tokens)`;
    } else if (actionName === 'Build') {
      const crane = currentPlayer?.neighbourhood.getBuilding('Crane');
      let buildCost = 2;
      if (crane) buildCost -= 1;
      text += ` - ${plan.name} (-${buildCost} tokens)`;
    }
    // TODO: Add location cost
  }

  if (actionName === 'Produce') {
    text += ` (+2 tokens)`;
  }

  return (
    <Card
      style={{
        backgroundColor: checked ? 'grey' : 'black',
        color: checked ? 'black' : 'white',
        width: '100%',
        padding: '10px',
      }}
    >
      <Typography variant="body1">{text}</Typography>
    </Card>
  );
}

function ButtonRadio({
  props,
  currentPlayer,
  turn,
}: {
  props?: RadioProps;
  currentPlayer?: PlayerWithInformation;
  turn: Turn;
}) {
  return (
    <Radio
      disableRipple
      color="default"
      value={JSON.stringify(turn)}
      checkedIcon={<ButtonTurnRadio turn={turn} currentPlayer={currentPlayer} checked />}
      icon={<ButtonTurnRadio currentPlayer={currentPlayer} turn={turn} />}
      {...props}
      style={{
        width: '100%',
        padding: 0,
      }}
    />
  );
}

function TurnSelector({
  selectedTurn,
  handleTurnSelectionChange,
  selectorOptions,
  currentPlayer,
}: {
  selectedTurn?: string;
  handleTurnSelectionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectorOptions: Array<{ value: string; label: string }>;
  currentPlayer?: PlayerWithInformation;
}) {
  return (
    <Grid item xs={12}>
      {selectorOptions && selectorOptions.length > 0 && (
        <FormControl fullWidth>
          <FormLabel id="demo-radio-buttons-group-label">
            Turn Selector ({currentPlayer?.label})
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={selectedTurn ?? selectorOptions[0].value}
            onChange={handleTurnSelectionChange}
          >
            {selectorOptions.map((option, index) => {
              const turn = JSON.parse(option.value) as Turn;
              return (
                <FormControlLabel
                  key={index}
                  value={option.value}
                  control={<ButtonRadio turn={turn} currentPlayer={currentPlayer} />}
                  label={''}
                  style={{
                    width: '100%',
                    margin: 0,
                  }}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      )}
    </Grid>
  );
}

export default function Game() {
  const [selectedTurn, setSelectedTurn] = useState<string>();
  const [playerTurn, setPlayerTurn] = useState<string>();
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [newPlayerAge, setNewPlayerAge] = useState<number>(18);
  const [stagedPlayers, setStagedPlayers] = useState<
    Array<{
      name: string;
      age: number;
      tokens: number;
    }>
  >([]);

  const [baseStartingTokens, setBaseStartingTokens] = useState<number>();

  const [availableTurns, setAvailableTurns] = useState<Array<Turn>>([]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  const handleSetSelectedTurn = (turn: string) => {
    console.log('handleSetSelectedTurn', turn);
    setSelectedTurn(turn);
    if (!buttonRef || !buttonRef.current) throw new Error('Button not found');
    buttonRef.current.value = turn;
  };

  const handleTurnSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSetSelectedTurn((event.target as HTMLInputElement).value);
  };

  const waitForTurnSubmit = async (name: string): Promise<string> => {
    setPlayerTurn(name);
    return new Promise((resolve, reject) => {
      if (!buttonRef || !buttonRef.current) throw new Error('Button not found');
      buttonRef.current.onclick = () => {
        const value = buttonRef.current?.value;
        if (!value) throw new Error('No selected Turn');
        resolve(value);
        setSelectedTurn(undefined);
      };
    });
  };
  const handleAskForTurn = async (turns: Array<Turn>): Promise<Turn> => {
    setAvailableTurns(turns);

    const jsonTurn = await waitForTurnSubmit(turns[0].playerName);
    const parsedTurn = JSON.parse(jsonTurn) as Turn;
    console.log('Parsed Turn', parsedTurn);
    console.log(turns);
    const turn = turns.find(
      (turn) => turn.action._type === parsedTurn.action._type && turn.playerName === turn.playerName
    );
    if (!turn) throw new Error('Turn not found');
    return turn;
  };

  const gameInterface = useMemo(() => {
    return new GameEngine();
  }, []);

  const planSupply = useMemo(() => {
    return gameInterface?.gameEngine?.planSupply;
  }, [gameInterface?.gameEngine?.planSupply]);

  const selectorOptions = useMemo(() => {
    return availableTurns.map((t) => {
      const option = {
        name: t.playerName,
        label: (t.action._type as string) ?? '',
        value: JSON.stringify(t),
        description: JSON.stringify(t.action) ?? '',
      };
      return option;
    });
  }, [availableTurns]);

  useEffect(() => {
    if (selectorOptions && selectorOptions.length > 0) {
      handleSetSelectedTurn(selectorOptions[0].value);
    }
  }, [selectorOptions]);

  const currentPlayer = useMemo(() => {
    return gameInterface?.gameEngine?.players.find((p) => p.label === playerTurn);
  }, [gameInterface?.gameEngine?.players, playerTurn]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          id="player-name"
          label="Name"
          variant="standard"
          value={newPlayerName}
          onChange={(e) => {
            setNewPlayerName(e.target.value);
          }}
          error={newPlayerName.length === 0}
        />
        <TextField
          id="player-age"
          label="Age"
          variant="standard"
          type="number"
          value={newPlayerAge}
          onChange={(e) => {
            setNewPlayerAge(parseInt(e.target.value));
          }}
          aria-valuemin={0}
          error={newPlayerAge < 0}
        />
        <Button
          variant="outlined"
          disabled={newPlayerName.length === 0 || newPlayerAge < 0 || !gameInterface}
          onClick={() => {
            if (!gameInterface) throw new Error('No game engine');
            if (!newPlayerName || newPlayerName.length === 0) throw new Error('No player name');
            if (!newPlayerAge || newPlayerAge < 0) throw new Error('No player age');
            setStagedPlayers((prev) => {
              return [
                ...prev,
                {
                  name: newPlayerName,
                  age: newPlayerAge,
                  tokens: baseStartingTokens ?? 0,
                },
              ];
            });

            setNewPlayerName('');
          }}
        >
          Add Player
        </Button>
        {stagedPlayers && stagedPlayers.length > 0 && (
          <Box>
            {stagedPlayers.map((p) => {
              return (
                <Card key={p.name}>
                  <Typography variant="body1">
                    {p.name} - {p.age}
                  </Typography>
                </Card>
              );
            })}
          </Box>
        )}
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="starting-tokens"
          label="Starting Tokens"
          defaultValue="3"
          value={baseStartingTokens}
          type="number"
          onChange={(e) => {
            setBaseStartingTokens(parseInt(e.target.value));
          }}
        />
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Use Player Ages" />
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          ref={startButtonRef}
          disabled={!gameInterface || !stagedPlayers || stagedPlayers.length === 0}
          onClick={() => {
            stagedPlayers.forEach((p) => {
              const addRes = gameInterface.addPlayer({
                name: p.name,
                age: p.age,
                tokens: p.tokens ?? baseStartingTokens ?? 3,
                interactionHooks: {
                  getTurnFromInterface: (turns: Array<Turn>): Promise<Turn> => {
                    return handleAskForTurn(turns);
                  },
                  getPlayerSelectionFromInterface: (players: Array<string>): Promise<string> => {
                    return new Promise((resolve) => {
                      setTimeout(() => {
                        resolve(players[0]);
                      }, 1000);
                    });
                  },
                },
              });
              console.log('Add Player', addRes);
            });
            gameInterface.createGame();
            gameInterface.startGame();
          }}
        >
          Start Game
        </Button>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={3}>
          <Typography variant="h6">Deck Size</Typography>

          <Typography variant="body1">
            {gameInterface?.gameEngine?.planSupply.deck.length}
          </Typography>
        </Grid>
        {planSupply?.plans.map((plan) => {
          return (
            <Grid item xs={3} key={plan.name}>
              <PlanCard plan={plan} />
            </Grid>
          );
        })}
      </Grid>

      <Grid container item xs={12}>
        <Grid container item xs={4}>
          <TurnSelector
            selectedTurn={selectedTurn}
            handleTurnSelectionChange={handleTurnSelectionChange}
            selectorOptions={selectorOptions}
            currentPlayer={currentPlayer}
          />
          <Grid item xs={12}>
            <Button
              variant="outlined"
              size="large"
              ref={buttonRef}
              disabled={!selectedTurn}
              fullWidth
            >
              Submit Turn (
              {selectedTurn ? JSON.parse(selectedTurn).action._type : 'No Turn Selected'})
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={8}>
          <Typography variant="h5">
            Neighbourhood ({playerTurn}) ({currentPlayer?.tokens} tokens)
          </Typography>
          {currentPlayer && <NeighbourhoodDisplay neighbourhood={currentPlayer?.neighbourhood} />}
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        {gameInterface.players && <Players players={gameInterface.players} />}
      </Grid>
    </Grid>
  );
}
