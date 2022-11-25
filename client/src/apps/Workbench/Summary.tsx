import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useWorkbench } from 'src/providers/workbench/workbench';
import { getCo2ValueInKgByDistance, getLatestCo2Value } from '@utils/co2';

const Summary = () => {
  const { selectedBattery, selectedMotor, selectedTransport } = useWorkbench();

  if (!(selectedBattery || selectedMotor || selectedTransport)) {
    return null;
  }

  const batteryCo2 =
    (selectedBattery && +getLatestCo2Value(selectedBattery.co2).value) || 0;
  const motorCo2 =
    (selectedMotor && +getLatestCo2Value(selectedMotor.co2).value) || 0;
  const transportCo2 =
    (selectedTransport &&
      getCo2ValueInKgByDistance(
        selectedTransport.distance,
        selectedTransport.co2,
      )) ||
    0;

  const totalCo2 = batteryCo2 + motorCo2 + transportCo2;

  const batteryCost = (selectedBattery && +selectedBattery.salesPrice) || 0;
  const motorCost = (selectedMotor && +selectedMotor.salesPrice) || 0;
  const transportCost =
    (selectedTransport && +selectedTransport.bill.split(' ')[0]) || 0;

  const totalCost = batteryCost + motorCost + transportCost;

  return (
    <div
      style={{
        width: '25%',
        background: 'white',
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        boxShadow:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      }}
    >
      <Box component={'div'} sx={{ padding: '20px' }}>
        <Typography variant='h5'>Summary:</Typography>
      </Box>
      <Box component={'div'} sx={{ paddingLeft: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <WarningIcon color='secondary' fontSize='medium' />
          <Typography variant='h6' component={'span'}>
            Total CO<sub>2</sub>:
          </Typography>
        </div>
        <div style={{ padding: '0px 25px', marginBottom: '20px' }}>
          <Table sx={{ width: '100%' }} aria-label='spanning table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'></TableCell>
                <TableCell align='right'>
                  <strong>
                    CO<sub>2</sub> value
                  </strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!batteryCo2 && (
                <TableRow>
                  <TableCell align='left'>Battery</TableCell>
                  <TableCell align='right'>{batteryCo2}</TableCell>
                </TableRow>
              )}
              {!!motorCo2 && (
                <TableRow>
                  <TableCell align='left'>Motor</TableCell>
                  <TableCell align='right'>{motorCo2}</TableCell>
                </TableRow>
              )}
              {!!transportCo2 && (
                <TableRow>
                  <TableCell align='left'>Transport</TableCell>
                  <TableCell align='right'>{transportCo2}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={1}>
                  <strong>Total</strong>
                </TableCell>
                <TableCell align='right'>
                  <strong>
                    {totalCo2} KgCO<sub>2</sub>
                  </strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <PaymentsIcon color='secondary' fontSize='medium' />
          <Typography variant='h6' component={'span'}>
            Total cost:
          </Typography>
        </div>
        <div style={{ padding: '0px 25px' }}>
          <Table sx={{ width: '100%' }} aria-label='spanning table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'></TableCell>
                <TableCell align='right'>
                  <strong>Cost</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!batteryCost && (
                <TableRow>
                  <TableCell align='left'>Battery</TableCell>
                  <TableCell align='right'>{batteryCost}</TableCell>
                </TableRow>
              )}
              {!!motorCost && (
                <TableRow>
                  <TableCell align='left'>Motor</TableCell>
                  <TableCell align='right'>{motorCost}</TableCell>
                </TableRow>
              )}
              {!!transportCost && (
                <TableRow>
                  <TableCell align='left'>Transport</TableCell>
                  <TableCell align='right'>{transportCost}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={1}>
                  <strong>Total</strong>
                </TableCell>
                <TableCell align='right'>
                  <strong>$ {totalCost}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Box>
    </div>
  );
};

export default Summary;
