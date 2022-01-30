import './App.css';
import * as React from 'react';
import Test from './FileInput';
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline';
import Appbar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import PlayerInfo from './PlayerInfo'

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
       <CssBaseline />
        <Appbar position="static">
         <Toolbar>
             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
               Shitty website
             </Typography>
             <Button color="inherit">Refresh</Button>
           </Toolbar>
        </Appbar>
        <Stack direction="row" spacing={2} className="card-stack">
           <Paper elevation={3} className="test-class-haha">
            <PlayerInfo name="player 1"></PlayerInfo>
           </Paper>
           
           <Paper elevation={3} className="test-class-haha"/>
           
           <Paper elevation={3} className="test-class-haha"/>
        </Stack>
        <Test onFileSelect={() => {}}/>
       <Button variant="contained">Hellow bazdmeg</Button>
      </React.Fragment>
   );
  }
}

export default App;
