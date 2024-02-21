import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    TextField
} from "@mui/material";
import { useState } from "react";

const SearchModal = ({open, setOpen, data, setCliente, tituloModal}) => {
    const handleCloseModal = () => {
        setOpen(false);
    };

    const [filteredClientes, setFilteredClientes] = useState([]);
    const [nombreCliente, setNombreCliente] = useState("");

    const onChangeClienteNombre = (e) => {
        let filteredArray = [];
        if (e.target.value.length >= 3) {
            filteredArray = data.filter(obj => obj.text.toUpperCase().includes(e.target.value.toUpperCase()))
            setFilteredClientes(filteredArray);
        } else {
            setFilteredClientes([]);
        }
        setNombreCliente(e.target.value);
    }

    const onClickChooseCliente = (clienteId) => {
        setCliente(clienteId)
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={handleCloseModal}
        >
            <DialogTitle id="alert-dialog-title">
                {tituloModal}
            </DialogTitle>
            <DialogContent>
                <TextField
                    hiddenLabel
                    size="small"
                    value={nombreCliente}
                    onChange={onChangeClienteNombre}
                />
                <List sx={{width: 500, height: 200}}>
                    {filteredClientes.map(item => (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton onClick={() => onClickChooseCliente(item.id)}>
                                <ListItemText primary={"ID: " + item.id + " - " + item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal} variant="contained">Cerrar</Button>
            </DialogActions>
        </Dialog>
    )
};

export default SearchModal;
