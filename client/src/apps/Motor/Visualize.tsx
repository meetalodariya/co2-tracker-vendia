import React, { FC, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

import Typography from '@mui/material/Typography';
import { AnyObject } from 'chart.js/types/basic';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface Props {
  open: boolean;
  handleClose: () => void;
  co2data: [];
}

const Visualize: FC<Props> = ({ open, handleClose, co2data }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Co2 historical data',
      },
    },
  };
  const labels = co2data.map((x: any) => x.year);
  labels.sort(function (a, b) {
    return a - b;
  });
  const obj: any = {};
  co2data.map((x: any) => {
    obj[x.year] = x.value;
  });
  const data = {
    labels,
    datasets: [
      {
        label: 'CO2 value (KgCo2)',
        data: obj,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Visualize</DialogTitle>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label='Bar Chart' {...a11yProps(0)} />
              <Tab label='Line chart' {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Bar options={options} data={data} />;
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Line options={options} data={data} />;
          </TabPanel>
        </Box>

        <DialogActions>
          <Button color='warning' onClick={handleClose}>
            Close Visualization
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Visualize;
