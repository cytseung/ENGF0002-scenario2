import React from 'react';

import axios from 'axios';

import { API_ROOT } from '../../config/global';

import Navbar from "../../components/Navbar/Navbar";
import NavigationButton from '../../components/NavigationButton/NavigationButton';

import Button from "@mui/material/Button";
import { Container, Box, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';

const Import = ({ theme }) => {

    const fileUploadToBackEnd = async (formData) => {
        try {
            await axios.post(`${API_ROOT}file-upload/`, formData)
                .then(res => {
                    setData(res.data);
                })

        } catch (e) {
            console.log(e)
        }
    }

    const Input = styled('input')({
        display: 'none',
    });

    const [selectedFile, setSelectedFile] = React.useState(null);
    const [data, setData] = React.useState(null);

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }
    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile, selectedFile.name);
        // POST request here
        await fileUploadToBackEnd(formData);
        // return (
        //     <div>
        //         <p>Number of Questions imported: {data.count}</p>
        //         {data.error? <p>Error: {data.error}</p>:<p>All questions imported successfully</p>}
        //     </div>
        // )
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
                {data &&
                    <div>
                        <p>Number of Questions imported: {data.importedCount}</p>
                        {data.error ? <p>Error: {data.error}</p> : <p>All questions imported successfully</p>}
                    </div>

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