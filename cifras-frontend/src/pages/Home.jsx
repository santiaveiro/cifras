// Home.jsx

import { Search } from "@mui/icons-material";
import {
    Box,
    Button,
    Container,
    Grid,
    TextField
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import DynamicSpan from "../components/reusable/DynamicSpan";
import SearchModal from "../components/reusable/SearchModal";
import CuentaCorrienteTableRows from "../components/reusable/table/CuentaCorrienteTableRows";
import LargeTable from "../components/reusable/table/LargeTable";
import clientesToSearchableItems from "../helpers/clientesToSearchableItems";

const Home = () => {
    const [clienteId, setClienteId] = useState('0');
    const [openSearchCliente, setOpenSearchCliente] = useState(false);
    const [searchableClientes, setSearchableClientes] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [selectedClientName, setSelectedClientName] = useState("");

    const apiGetClienteById = async (id) => {
        return await axios.get(`http://localhost:8081/v1/clientes/${id}`).then(res => res.data.nombre);
    }

    const apiGetClientes = async () => {
        return await axios.get("http://localhost:8081/v1/clientes/nombres").then(res => res.data);
    }

    const apiGetCuentaCorriente = async (id) => {
        return await axios.get(`http://localhost:8081/v1/cuentas-corrientes/cliente/${id}`).then(res => res.data);
    }

    const { isLoading: isLoadingClienteById, refetch: getClienteById, data: clienteById } = useQuery({
        queryKey: ["getclientebyid", selectedClientId],
        queryFn: () => apiGetClienteById(selectedClientId),
        enabled: false,
        retry: false
    });

    const { isLoading: isLoadingClientes, refetch: getAllClientes, data: clientes } = useQuery({
        queryKey: ["clientes"],
        queryFn: apiGetClientes,
        enabled: false
    });

    const { isLoading: isLoadingCuentaCorriente, refetch: getCuentaCorriente, data: cuentaCorriente } = useQuery({
        queryKey: ["cuentacorriente", selectedClientId],
        queryFn: () => apiGetCuentaCorriente(selectedClientId),
        enabled: false
    });

    useEffect(() => {
        if (selectedClientId !== null) {
            getCuentaCorriente();
            if (!isLoadingClienteById && clienteById) {
                console.log("Nombre del cliente:", clienteById);
                setSelectedClientName(clienteById);
            }
        }
    }, [selectedClientId, clienteById, isLoadingClienteById]);

    const onChangeClienteId = (e) => {
        setClienteId(e.target.value);
    }

    const onClickSearchCliente = () => {
        if (clienteId === '0') {
            getAllClientes().then(res => {
                return clientesToSearchableItems(res.data)
            })
            .then(data => {
                setSearchableClientes(data)
                setOpenSearchCliente(true)
            })
        } else {
            setSelectedClientId(clienteId);
            setOpenSearchCliente(false);
            setSelectedClientName(""); // Limpiar el nombre del cliente cuando se selecciona un cliente específico
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
        { id: 5, content: 'Observaciones', align: 'center' },
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
                        {selectedClientName !== null && selectedClientName !== "" && (
                            <DynamicSpan name={selectedClientName} />
                        )}
                    </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 2 }}>
                    {selectedClientName !== null && selectedClientName !== "" && (
                        <Grid item>
                            <span style={{ marginLeft: 16, fontSize: '1rem', color: '#333' }}>Cliente seleccionado: {selectedClientName}</span>
                        </Grid>
                    )}
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
                setCliente={(clientId) => {
                    setSelectedClientId(clientId);
                    setOpenSearchCliente(false);
                    setSelectedClientName(""); // Limpiar el nombre del cliente cuando se selecciona un cliente específico
                }}
                tituloModal={"Buscar Cliente por Nombre"}
            />
        </Box>
    )
};

export default Home;
