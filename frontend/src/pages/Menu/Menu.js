import Navbar from "../../components/Navbar/Navbar";
import Button from '@mui/material/Button';
import { Container, Stack } from '@mui/material';

const Menu = () => {
    return (
        <>
            <Navbar>COMP0011 Practice Tool</Navbar>
            <Container maxWidth="lg">
                <Stack paddingY={25}
                    justifyContent="center"
                    alignItems="center"
                    spacing={8}>
                    <Button href="/options" variant="contained" size="large" sx={{ fontSize: 30, width:'40%' }} >Start</Button>
                    <Button href="/import" variant="contained" size="large" sx={{ fontSize: 30, width:'40%' }}>Import</Button>
                </Stack>
            </Container>
        </>
    )
}
export default Menu;