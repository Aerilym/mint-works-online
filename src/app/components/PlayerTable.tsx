import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { PlayerWithInformation } from 'mint-works/dist/mint_works';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(player: PlayerWithInformation) {
  return {
    name: player.label,
    tokens: player.tokens,
    stars: player.neighbourhood.stars(),
    plans: player.neighbourhood.plans.length,
    buildings: player.neighbourhood.buildings.length,
    subTables: [
      {
        name: 'Plans',
        items: player.neighbourhood.plans,
      },
      {
        name: 'Buildings',
        items: player.neighbourhood.buildings,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.tokens}</TableCell>
        <TableCell align="right">{row.stars}</TableCell>
        <TableCell align="right">{row.plans}</TableCell>
        <TableCell align="right">{row.buildings}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h5" gutterBottom component="div">
                Neighbourhood
              </Typography>

              {row.subTables.map((subTable) => {
                return (
                  <Table key={subTable.name} size="small" aria-label={subTable.name}>
                    <TableHead>
                      <Typography variant="h6" gutterBottom component="div">
                        {subTable.name}
                      </Typography>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Cost</TableCell>
                        <TableCell>Stars</TableCell>
                        <TableCell align="right">Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subTable.items.map((item) => (
                        <TableRow key={item.name}>
                          <TableCell component="th" scope="row">
                            {item.name}
                          </TableCell>
                          <TableCell>{item.cost}</TableCell>
                          <TableCell>{item.baseStars}</TableCell>
                          <TableCell align="right">{item.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                );
              })}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function PlayerTable({ players }: { players: Array<PlayerWithInformation> }) {
  const rows = players.map((player) => {
    return createData(player);
  });
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Tokens</TableCell>
            <TableCell align="right">Stars</TableCell>
            <TableCell align="right">Plans</TableCell>
            <TableCell align="right">Buildings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
