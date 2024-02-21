import { TableCell } from "@mui/material";
import React from "react";

const TableCellForLargeTable = ({ width, content, align, color }) => {
  return (
    <TableCell
      align={align}
      sx={{
        border: 1,
        borderColor: "#9e9e9e",
        width: width,
        py: 0,
        px: 1,
        color: color || "inherit",
      }}
    >
      {content}
    </TableCell>
  );
};

export default TableCellForLargeTable;
