import { CssBaseline } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import RootLayout from './layout/RootLayout';

import Home from './pages/Home';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
        </Route>
    )
);

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <RouterProvider router={router}/>
        </QueryClientProvider>
    );
}

export default App;
