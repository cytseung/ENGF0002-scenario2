import React from 'react'

import { useLocation } from 'react-router-dom'

import Navbar from "../../components/Navbar/Navbar";
import NavigationButton from '../../components/NavigationButton/NavigationButton';

import {Box, Grid} from '@mui/material'

const Results = () => {
    const { state } = useLocation();
    console.log(state);
    const score = state.score;
    return (
        <div>
            <Navbar>Results</Navbar>
            <p>Your final score is {score}.</p>
            <Box m = {5} sx={{ position: 'inherit', right: '10%', bottom: '10%' }}>
                <Grid item align="right">
                    <NavigationButton href="/" variant="contained" >Back to Menu</NavigationButton>
                </Grid>
            </Box>
        </div>
    )
}

export default Results