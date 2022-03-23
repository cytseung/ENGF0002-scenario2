import React from 'react';

import axios from 'axios';

import { API_ROOT } from '../../config/global';

import Navbar from "../../components/Navbar/Navbar";
import NavigationButton from '../../components/NavigationButton/NavigationButton';

import Button from "@mui/material/Button";
import { Container, Box, Grid, TextField, FormControl } from "@mui/material";
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
    const [showForm, setShowForm] = React.useState(false);
    const [name, setName] = React.useState("");
    const [text, setText] = React.useState("");

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }
    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile, selectedFile.name);
        // POST request here
        await fileUploadToBackEnd(formData);
    }

    const handleSubmitType = async (event) => {
        const payload = {name: name, text: text};
        try {
            const res = await axios.post(`${API_ROOT}types/`, payload)
            if (res.status === 201){
                alert(`type ${name} created.`);
                setName("");
                setText("");
            }
        }catch (e){
            alert("error in adding new type")
            console.log(e);
        }
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
                <Grid m={5} my={10} sx={{ position: 'inherit', right: '20%', bottom: '10%' }}>
                    <label htmlFor="choose-file-button">
                        <Input id="choose-file-button" type="file" onChange={onFileChange} />
                        <Button variant="contained" component="span">Choose File</Button>
                    </label>
                    {fileData()}
                    {selectedFile &&
                        <Grid component="span" item m={3}>
                            <Button variant="contained" sx={{ position: 'inherit', right: '10%', bottom: '10%' }} onClick={onFileUpload}>Upload</Button>
                        </Grid>
                    }
                    {data &&
                        <div>
                            <p>Number of Questions imported: {data.importedCount}</p>
                            {data.error ? <p>Error: {data.error}</p> : <p>All questions imported successfully</p>}
                        </div>

                    }

                    <Grid m={1} sx={{ float: "right", position: "relative", right: '5%' }} >
                        <Button variant="contained" sx={{ float: "right" }} onClick={() => setShowForm(!showForm)}>Add Types</Button>
                        {showForm &&
                            <Box sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}>
                                <FormControl>
                                    <TextField required label="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                                    <TextField required label="text" value={text} onChange={(e)=>setText(e.target.value)}/>
                                    <Button type="submit" variant="contained" onClick={handleSubmitType}> submit </Button>
                                </FormControl>
                            </Box>
                        }
                    </Grid>



                </Grid>

                <Box my={40} sx={{ position: 'sticky', right: '5%', bottom: '10%' }}>
                    <Grid item align="right" float="right">
                        <NavigationButton href="/" variant="contained" >Back to Menu</NavigationButton>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default Import