import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {API_ROOT} from "../../config/global"
import Navbar from "../../components/Navbar/Navbar";
import NavigationButton from '../../components/NavigationButton/NavigationButton';

import { Container, Box, Grid, FormControl, InputLabel, Select, Button, MenuItem } from "@mui/material";

const Options = () => {
    const [number, setNumber] = React.useState(0);
    const [totalNum, setTotalNum] = React.useState(0);
    const navigate = useNavigate();

    const maxNum = 20;
    const handleChange = (e) => {
        setNumber(e.target.value);
    }
    React.useEffect(() => {
        async function getTotalNum() {
            try {
                // get total num here
                let response = await axios.get(`${API_ROOT}imported-matrix-questions/total_number_of_questions`)
                setTotalNum(response.data.totalNumber);
            } catch (e) {
                console.log(e)
            }
        }
        getTotalNum();
    }, [])

    const handleSubmitNumber = async (e) => {
        // get questions from server here
        try {
            let response = await axios.get(`${API_ROOT}imported-matrix-questions/?num=${number}`)
            if (response.data.length !== 0){
                navigate('/questions',{state: response.data});
            }
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div>
            <Navbar>Options</Navbar>
            <Container maxWidth="lg" variant="main">
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-label">Number</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={number}
                        label="Number"
                        onChange={handleChange}
                    >
                        {totalNum <= maxNum ? [...Array(totalNum).keys()].map(i => {
                            return <MenuItem value={i + 1} key={i + 1}>{i + 1}</MenuItem>
                        }) : [...Array(maxNum).keys()].map(i => {
                            return <MenuItem value={i + 1} key={i + 1}>{i + 1}</MenuItem>
                        })}
                    </Select>
                    <Button variant="contained" onClick={handleSubmitNumber} disabled={number <= 0 || number > maxNum} sx={{ m: 2 }}>Submit</Button>
                </FormControl>
                <Box sx={{ position: 'inherit', right: '10%', bottom: '10%' }}>
                    <Grid item align="right">
                        <NavigationButton href="/" variant="contained" >Back to Menu</NavigationButton>
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}

export default Options