import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import UpdateDialogue from './UpdateDialogue';
import { Battery } from './types';
import { CircularProgress } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Visualize from './Visualize';

function Row({ row }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [visOpen, setVisOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleVisOpen = () => setVisOpen(true);
  const handleVisClose = () => setVisOpen(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell scope='row'>
          <img src={row.imageURL} width='40px' alt={row.serialNumber} />
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.partNumber}
        </TableCell>
        <TableCell align='center'>{row.serialNumber}</TableCell>
        <TableCell width='200px' align='center'>
          <span
            style={{
              textOverflow: 'ellipsis',
              maxWidth: '200px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              display: 'inline-block',
            }}
          >
            {row.imageURL}
          </span>
        </TableCell>
        <TableCell align='center'>{new Date(row.dateManufactured).toDateString()}</TableCell>
        <TableCell align='center'>{row.salesPrice}</TableCell>
        <TableCell align='center'>
          <IconButton onClick={handleOpen}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell align='center'>
          <IconButton onClick={handleVisOpen}>
            <ShowChartIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <UpdateDialogue open={open} handleClose={handleClose} row={row} />
      <Visualize open={visOpen} handleClose={handleVisClose} co2data={row?.co2}/>
    </>
  );
}

interface Props {
  data: Array<Battery> | undefined;
  isLoading: boolean;
}

const CollapsibleTable: React.FC<Props> = ({ data, isLoading }) => {
  return (
    <TableContainer
      sx={{ width: '100%', height: '80vh', padding: '18px' }}
      component={Paper}
    >
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <strong>Part Number</strong>
            </TableCell>
            <TableCell align='center'>
              <strong>Serial Number</strong>
            </TableCell>
            <TableCell align='center'>
              <strong>Image URL</strong>
            </TableCell>
            <TableCell align='center'>
              <strong>Production date</strong>
            </TableCell>
            <TableCell align='center'>
              <strong>Sales price</strong>
            </TableCell>
            <TableCell align='center'>
              <strong>Actions</strong>
            </TableCell>
            <TableCell align='center'>
              <strong>Charts</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading || !data ? (
            <div
              style={{
                display: 'table-row',
                width: '100%',
                position: 'relative',
                marginTop: '15px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translate(-50%, 0)',
                }}
              >
                <CircularProgress />
              </div>
            </div>
          ) : (
            data.map((row) => <Row key={row._id} row={row} />)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
