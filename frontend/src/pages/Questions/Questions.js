import React from 'react';
import axios from 'axios';
import MathJax from "react-mathjax";
import { useLocation, useNavigate } from "react-router-dom";

import { API_ROOT } from '../../config/global';
import Navbar from "../../components/Navbar/Navbar";
import NavigationButton from "../../components/NavigationButton/NavigationButton";
import Matrix from "../../components/Matrix/Matrix.js";

import { Box, Container, Grid, TextField, Button } from "@mui/material";
const Questions = () => {
    const { state } = useLocation();
    const questions = state;
    console.log(questions)
    const [question, setQuestion] = React.useState(questions[0]);
    const [m1Latex, setM1Latex] = React.useState("");
    const [m2Latex, setM2Latex] = React.useState("");
    const [qTextArray, setQTextArray] = React.useState([]);
    const [score, setScore] = React.useState(0);
    const [correctState, setCorrectState] = React.useState(false);

    const navigate = useNavigate();
    const total = questions.length;

    const matrixState = React.useRef([["0","0"],["0","0"]])

    const generateMatrixLatex = (matrixString) => {
        let matrix = JSON.parse(matrixString);
        let result = `\\begin{bmatrix}`;
        for (let row of matrix) {
            for (let val of row) {
                result += val;
                result += `&`
            }
            result = result.slice(0, -1);
            result += `\\\\`
        }
        result += `\\end{bmatrix}`;
        return result;
    }


    React.useEffect(() => {
        const m1Latex = generateMatrixLatex(question.matrix1);
        const m2Latex = generateMatrixLatex(question.matrix2);
        const qTextArray = question.type.text.split(/\${.*?}/g);
        setM1Latex(m1Latex);
        setM2Latex(m2Latex);
        setQTextArray(qTextArray);
    }, [question])

    const handleNavigateToFinish = () => {
        navigate("/results", { state: { score } })
    }

    const answerSubmit = async (answer) => {
        const ans = JSON.stringify(answer)
        const payload = { answer: ans };
        try {
            const response = await axios.post(`${API_ROOT}imported-matrix-questions/${question.id}/`, payload);
            if (response.data.isCorrect){
                setScore(score => score + 1);
                setQuestion(questions[questions.indexOf(question) + 1]);
                alert("Correct!")
                return true;
            }
            alert("Not Correct! Try again!")
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar>Question {questions.indexOf(question) + 1}</Navbar>
            <Container maxWidth="lg" variant="main" >
                <Box sx={{ mb: 10 }}>
                    <MathJax.Provider>
                        <span>{qTextArray[0]}</span>
                        <MathJax.Node inline formula={m1Latex} />
                        <span>{qTextArray[1]}</span>
                        <MathJax.Node inline formula={m2Latex} />
                        <span>{qTextArray[2]}</span>
                    </MathJax.Provider>
                </Box>
                <Box sx={{ mb: 10 }}>
                    <Matrix onSubmit={answerSubmit} />
                </Box>
                <Box sx={{ position: 'inherit', right: '10%', bottom: '10%', flexGrow: 1 }}>
                    <Grid container>
                        <Grid item align="left" xs={8}>
                            <NavigationButton href="/" variant="contained" >Back to Menu</NavigationButton>
                        </Grid>
                        <Grid item align="right" xs={4} >
                            {questions.indexOf(question) + 1 < total
                                ? <NavigationButton variant="contained" onClick={() => { setQuestion(questions[questions.indexOf(question) + 1]) }}>Next</NavigationButton>
                                : <NavigationButton variant="contained" onClick={handleNavigateToFinish}>Finish</NavigationButton>}

                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}
export default Questions;
