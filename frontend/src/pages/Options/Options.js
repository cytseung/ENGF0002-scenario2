import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Navbar from "../../components/Navbar/Navbar";
import NavigationButton from '../../components/NavigationButton/NavigationButton';

import { Container, Box, Grid, FormControl, InputLabel, Select, Button, MenuItem } from "@mui/material";

const dummyData = {
    totalNumber: 18
}
function getData(dummyData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(dummyData), 1000)
    })
}

const dummyQData = {
    questions: [{
        "id": 2,
        "type": {
            "id": 1,
            "name": "matadd",
            "text": "Please enter the sum of ${m1Latex} and ${m2Latex}."
        },
        "created_on": "2022-01-07T18:30:38.440571Z",
        "matrix1": "[[1,2,3],[4,5,6]]",
        "matrix2": "[[1,5,3],[1,2,5]]"
    },{
        "id": 4,
        "type": {
            "id": 2,
            "name": "matmul",
            "text": "Please enter the product of ${m1Latex} and ${m2Latex}."
        },
        "created_on": "2022-01-08T18:30:38.440571Z",
        "matrix1": "[[1,2,3],[4,5,6],[7,8,9]]",
        "matrix2": "[[1,0,0],[0,1,0],[0,0,1]]"
    }]
};
console.log(dummyQData)

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
                let response = await getData(dummyData);
                setTotalNum(response.totalNumber);
            } catch (e) {
                console.log(e)
            }
        }
        getTotalNum();
    }, [])

    const handleSubmitNumber = async (e) => {
        // get questions from server here
        try {
            let response = await getData(dummyQData);
            if (response.questions.length !== 0){
                navigate('/questions',{state: response.questions});
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