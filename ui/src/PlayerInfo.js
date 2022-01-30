
import { ConstructionRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';
import React from 'react';

class PlayerInfo extends React.Component {
    render() {
        return <Box>{this.props.name}</Box>
    }
}



export default PlayerInfo;