import { TableRow } from "@mui/material";
import React from "react";
import TableCellForLargeTable from "./TableCellForLargeTable";

const CuentaCorrienteTableRows = ({ data }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return data ? (
    data.map((obj) => (
      <TableRow key={obj.id}>
        <TableCellForLargeTable
          width={40}
          content={obj.idTiposDeComprobante || ""}
          align="center"
        />
        <TableCellForLargeTable
          width={40}
          content={obj.idLetraDeComprobante || ""}
          align="center"
        />
        <TableCellForLargeTable
          width={120}
          content={formatDate(obj.fecha) || ""}
          align="center"
        />
        <TableCellForLargeTable
          width={120}
          content={(obj.debe || 0).toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
          })}
          align="right"
          color="red"
        />
        <TableCellForLargeTable
          width={120}
          content={(obj.haber || 0).toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
          })}
          align="right"
          color="green"
        />
        <TableCellForLargeTable content={obj.observaciones || ""} align="left" />
      </TableRow>
    ))
  ) : null;
};

export default CuentaCorrienteTableRows;
