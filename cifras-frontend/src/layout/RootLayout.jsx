import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import '../App.css';

const RootLayout = () => {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Container sx={{flexGrow: 1}}>
                <Outlet />
            </Container>
        </Box>
    )
};

export default RootLayout;