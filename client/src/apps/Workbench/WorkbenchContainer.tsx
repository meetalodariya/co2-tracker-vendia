import React, { useCallback, useState } from 'react';
import { Grid, Box, Button } from '@mui/material';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';
import theme from 'src/theme';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import BatteryList from './Battery/BatteryList';
import BatteryBucket from './Battery/BatteryBucket';
import MotorList from './Motor/MotorList';
import MotorBucket from './Motor/MotorBucket';
import TransportList from './Transport/TransportList';
import TransportBucket from './Transport/TransportBucket';
import Summary from './Summary';
import { useWorkbench } from 'src/providers/workbench/workbench';
import CreateHptForm from './CreateHptForm';

const iconStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6px',
  borderRadius: '6px',
};

const renderComponentList = (activeComponentList: string) => {
  switch (activeComponentList) {
    case 'battery':
      return <BatteryList />;
    case 'motor':
      return <MotorList />;
    case 'transport':
      return <TransportList />;
  }
};

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const WorkbenchContainer = () => {
  const {
    selectedBattery,
    selectedMotor,
    selectedTransport,
    resetSelection,
    activeComponentList,
    setActiveComponentList,
  } = useWorkbench();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const switchComponentList = useCallback(
    (component) => {
      if (activeComponentList === component) {
        return setActiveComponentList('');
      }

      setActiveComponentList(component);
    },
    [activeComponentList, setActiveComponentList],
  );

  const shouldShowCreate =
    selectedBattery && selectedMotor && selectedTransport;

  const shouldShowReset = selectedBattery || selectedMotor || selectedTransport;

  return (
    <>
      <div style={{ display: 'flex', height: '100%', position: 'relative' }}>
        <div style={{ width: '30%', height: '100%' }}>
          <Grid
            container
            columnSpacing={2}
            sx={{ height: '100%', margin: '8px 0px 40px 0px' }}
          >
            <Grid item>
              <div
                style={{
                  width: 'fit-content',
                  background: 'white',
                  boxShadow: '1px 1px 1px 0.5px #888888',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '8px',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  gap: '12px',
                }}
              >
                <Box
                  sx={{
                    backgroundColor:
                      activeComponentList === 'battery'
                        ? theme.palette.primary.light
                        : 'white',
                    cursor: 'pointer',
                    ...iconStyles,
                  }}
                  component='div'
                  onClick={() => switchComponentList('battery')}
                >
                  <BootstrapTooltip title='Battery' placement='right'>
                    <ElectricMeterIcon
                      sx={{
                        color:
                          theme.palette.primary[
                            activeComponentList === 'battery'
                              ? 'contrastText'
                              : 'light'
                          ],
                      }}
                      fontSize='large'
                    />
                  </BootstrapTooltip>
                </Box>
                <Box
                  sx={{
                    backgroundColor:
                      activeComponentList === 'motor'
                        ? theme.palette.primary.light
                        : 'white',
                    cursor: 'pointer',
                    ...iconStyles,
                  }}
                  component='div'
                  onClick={() => switchComponentList('motor')}
                >
                  <BootstrapTooltip title='Motor' placement='right'>
                    <SettingsInputSvideoIcon
                      sx={{
                        color:
                          theme.palette.primary[
                            activeComponentList === 'motor'
                              ? 'contrastText'
                              : 'light'
                          ],
                      }}
                      fontSize='large'
                    />
                  </BootstrapTooltip>
                </Box>
                <Box
                  sx={{
                    ...iconStyles,
                    backgroundColor:
                      activeComponentList === 'transport'
                        ? theme.palette.primary.light
                        : 'white',
                    cursor: 'pointer',
                  }}
                  component='div'
                  onClick={() => switchComponentList('transport')}
                >
                  <BootstrapTooltip title='Transport' placement='right'>
                    <LocalShippingIcon
                      sx={{
                        color:
                          theme.palette.primary[
                            activeComponentList === 'transport'
                              ? 'contrastText'
                              : 'light'
                          ],
                      }}
                      fontSize='large'
                    />
                  </BootstrapTooltip>
                </Box>
              </div>
            </Grid>
            <Grid item sx={{ width: '70%' }}>
              <Box
                sx={{
                  width: '100%',
                  height: '90%',
                  background: 'white',
                  borderRadius: '4px',
                  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                }}
                visibility={activeComponentList ? 'visible' : 'hidden'}
                component='div'
              >
                {renderComponentList(activeComponentList)}
              </Box>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            width: '30%',
            height: '100%',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '35px',
          }}
        >
          <BatteryBucket />
          <MotorBucket />
          <TransportBucket />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '20px',
              gap: '10px',
            }}
          >
            <Button
              variant='contained'
              color='info'
              disabled={!shouldShowReset}
              startIcon={<RestartAltIcon fontSize='small' />}
              onClick={resetSelection}
            >
              Reset
            </Button>
            <Button
              variant='contained'
              disabled={!shouldShowCreate}
              startIcon={<AddIcon fontSize='small' />}
              onClick={() => setIsFormOpen(true)}
            >
              Create
            </Button>
            <CreateHptForm
              open={isFormOpen}
              handleClose={() => setIsFormOpen(false)}
            />
          </div>
        </div>
        <Summary />
      </div>
    </>
  );
};

export default WorkbenchContainer;
