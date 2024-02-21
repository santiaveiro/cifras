import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead, TableRow
} from "@mui/material";
import TableCellForLargeTable from "./TableCellForLargeTable";

const LargeTable = ({rows, columns}) => {
    return (
        <TableContainer component={Paper} sx={{marginY: 2}}>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{backgroundColor: '#e0e0e0'}}>
                        {columns.map(obj => {
                            return (
                                obj.width ? 
                                    <TableCellForLargeTable 
                                        key={obj.id}
                                        width={obj.width}
                                        content={obj.content}
                                        align={obj.align}
                                    />
                                :
                                    <TableCellForLargeTable 
                                        key={obj.id}
                                        content={obj.content}
                                        align={obj.align}
                                    />
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default LargeTable;