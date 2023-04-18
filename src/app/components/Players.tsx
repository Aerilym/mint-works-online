'use client';
import { Box, Typography, Tabs, Tab, Card } from '@mui/material';
import { PlayerWithInformation } from 'mint-works/dist/mint_works';
import { useState } from 'react';
import NeighbourhoodDisplay from './NeighbourhoodDisplay';
import PlayerTable from './PlayerTable';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`player-tab-panel-${index}`}
      aria-labelledby={`player-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default function Players({ players }: { players: Array<PlayerWithInformation> }) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="player tabs">
          <Tab
            icon={
              <Card>
                <Typography variant="body1">Overview</Typography>
              </Card>
            }
          />
          {players.map((player, index) => (
            <Tab
              onClick={() => {
                if (value === index + 1) setValue(0);
              }}
              icon={
                <Card>
                  <Typography variant="body1">{player.label}</Typography>
                  <Typography variant="body1">Tokens: {player.tokens}</Typography>
                  <Typography variant="body1">Stars: {player.neighbourhood.stars()}</Typography>
                  <Typography variant="body1">
                    Buildings: {player.neighbourhood.buildings.length}
                  </Typography>
                  <Typography variant="body1">
                    Plans: {player.neighbourhood.plans.length}
                  </Typography>
                </Card>
              }
              key={player.label}
              id={`player-tab-${index + 1}`}
              aria-controls={`player-tab-panel-${index + 1}`}
            />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography variant="h4">Overview</Typography>
        <Typography variant="body1">
          This is an overview of all the players in the game. Click on a player to see their current
          state.
        </Typography>
        <PlayerTable players={players} />
      </TabPanel>
      {players.map((player, index) => (
        <TabPanel key={player.label} value={value} index={index + 1}>
          <NeighbourhoodDisplay neighbourhood={player.neighbourhood} />
        </TabPanel>
      ))}
    </Box>
  );
}
