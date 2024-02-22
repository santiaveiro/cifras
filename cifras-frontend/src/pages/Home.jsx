
import { Search } from "@mui/icons-material";
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchModal from "../components/reusable/SearchModal";
import CuentaCorrienteTableRows from "../components/reusable/table/CuentaCorrienteTableRows";
import LargeTable from "../components/reusable/table/LargeTable";
import clientesToSearchableItems from "../helpers/clientesToSearchableItems";

const Home = () => {
    const [clienteId, setClienteId] = useState('0');
    const [openSearchCliente, setOpenSearchCliente] = useState(false);
    const [searchableClientes, setSearchableClientes] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null); // Estado para almacenar el cliente seleccionado
    const [selectedClientName, setSelectedClientName] = useState(""); // Estado para almacenar el nombre del cliente seleccionado

    const apiGetClienteById = async (id) => {
        return await axios.get(`http://localhost:8081/v1/clientes/${id}/nombres`).then(res => res.data);
    }

    const apiGetClientes = async () => {
        return await axios.get("http://localhost:8081/v1/clientes/nombres").then(res => res.data);
    }

    const apiGetCuentaCorriente = async (id) => {
        return await axios.get(`http://localhost:8081/v1/cuentas-corrientes-clientes/${id}`).then(res => res.data);
    }

    const { isLoading: isLoadingClienteById, refetch: getClienteById, data: clienteById } = useQuery({
        queryKey: ["getclientebyid"],
        queryFn: () => apiGetClienteById(clienteId),
        enabled: false,
        retry: false
    });

    const { isLoading: isLoadingClientes, refetch: getAllClientes, data: clientes } = useQuery({
        queryKey: ["clientes"],
        queryFn: apiGetClientes,
        enabled: false
    });

    const { isLoading: isLoadingCuentaCorriente, refetch: getCuentaCorriente, data: cuentaCorriente } = useQuery({
        queryKey: ["cuentacorriente"],
        queryFn: () => apiGetCuentaCorriente(clienteId),
        enabled: false
    });

    useEffect(() => {
        if (selectedClient) {
            setClienteId(selectedClient.id); // Actualizar el ID del cliente cuando se selecciona un cliente
            setSelectedClientName(selectedClient.text); // Actualizar el nombre del cliente seleccionado
        }
    }, [selectedClient]);

    const onChangeClienteId = (e) => {
        setClienteId(e.target.value);
    }

    const onClickSearchCliente = () => {
        if (clienteId === '0') {
            if (!clientes) {
                getAllClientes().then(res => {
                    return clientesToSearchableItems(res.data)
                })
                .then(data => {
                    setSearchableClientes(data)
                    setOpenSearchCliente(true)
                })
            } else {
                setOpenSearchCliente(true)
            }
        } else {
            getCuentaCorriente()
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === 'Return') {
            onClickSearchCliente();
        }
    }

    const columns = [
        { id: 0, width: 40, content: 'Tipo', align: 'center' },
        { id: 1, width: 40, content: 'Letra', align: 'center' },
        { id: 2, width: 120, content: 'Fecha', align: 'center' },
        { id: 3, width: 200, content: 'Debe', align: 'center' },
        { id: 4, width: 200, content: 'Haber', align: 'center' },
        { id: 5, width: 200, content: 'Saldo', align: 'center' }, // Nueva columna "Saldo"
        { id: 6, content: 'Observaciones', align: 'center' },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <Container >
                <Grid container sx={{ marginTop: 2 }} alignItems="center">
                    <Grid item>
                        <TextField
                            hiddenLabel
                            size="small"
                            value={clienteId}
                            onChange={onChangeClienteId}
                            onKeyPress={handleKeyPress}
                            sx={{ marginRight: 2 }}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={onClickSearchCliente}
                        >
                            <Search />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" gutterBottom sx={{ marginLeft: 2 }}>
                            {selectedClientName} {/* Mostrar el nombre del cliente seleccionado */}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 2 }}>
                    <LargeTable
                        columns={columns}
                        rows={<CuentaCorrienteTableRows data={cuentaCorriente} />}
                    />
                </Grid>
            </Container>
            <SearchModal
                open={openSearchCliente}
                setOpen={setOpenSearchCliente}
                data={searchableClientes}
                setCliente={(client) => {
                    setSelectedClient(client); // Actualizar el cliente seleccionado
                    setOpenSearchCliente(false);
                    setSelectedClientName(client.text); // Actualizar el nombre del cliente seleccionado
                }}
                tituloModal={"Buscar Cliente por Nombre"}
            />
        </Box>
    )
};

export default Home;
