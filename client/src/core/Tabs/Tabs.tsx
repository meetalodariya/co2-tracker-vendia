import React from 'react';

import MuiTabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MuiTab from '@mui/material/Tab';

export interface TabsProps {
  tabs: CustomTabProps[];
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface CustomTabProps {
  label: string;
  Component: React.ReactNode;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
};

const Tabs = ({ tabs }: TabsProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <MuiTabs value={value} onChange={handleChange}>
        {tabs.map((tab, index) => (
          <MuiTab key={index} label={tab.label} />
        ))}
      </MuiTabs>
      {tabs.map(({ Component }, i) => (
        <TabPanel key={i} value={value} index={i}>
          {Component}
        </TabPanel>
      ))}
    </>
  );
};
export default Tabs;
