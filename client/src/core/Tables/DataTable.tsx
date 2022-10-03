import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid';

export interface TableProps {
  rows: object[];
  columns: GridColDef[];
  height: string | number;
  width: string;
}

const DataTable = ({ rows, columns, height, width }: TableProps) => {
  return (
    <div style={{ height: height, width }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};

export default DataTable;
