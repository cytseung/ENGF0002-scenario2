import React from 'react';

import axios from 'axios';

import Navbar from "../../components/Navbar/Navbar";
import NavigationButton from '../../components/NavigationButton/NavigationButton';

import Button from "@mui/material/Button";
import { Container, Box, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';

const Import = ({ theme }) => {
    const Input = styled('input')({
        display: 'none',
    });

    const [selectedFile, setSelectedFile] = React.useState(null);

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }
    const onFileUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile, selectedFile.name);
        console.log(selectedFile)
        // POST request here

    }
    const fileData = () => {
        if (selectedFile) {
            return (
                <div>
                    <p>File Name: {selectedFile.name}</p>
                    <p>File Type: {selectedFile.type}</p>

                </div>
            )
        }
    }

    return (
        <>
            <Navbar>Import</Navbar>
            <Container maxWidth="lg" variant="main" >
                <label htmlFor="choose-file-button">
                    <Input id="choose-file-button" type="file" onChange={onFileChange} />
                    <Button variant="contained" component="span">Choose File</Button>
                </label>

                {fileData()}
                {selectedFile &&
                    <Grid item m={3}>
                        <Button variant="contained" sx={{ position: 'inherit', right: '10%', bottom: '10%' }} onClick={onFileUpload}>Upload</Button>
                    </Grid>
                }
                <Box sx={{ position: 'inherit', right: '10%', bottom: '10%' }}>
                    <Grid item align="right">
                        <NavigationButton href="/" variant="contained" >Back to Menu</NavigationButton>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default Import