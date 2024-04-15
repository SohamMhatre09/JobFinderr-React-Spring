import React, { useState } from 'react';
import { Box, Tab, Typography, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Link } from 'react-router-dom';
import Create from './Create';

export default function Home() {
  const [value, setValue] = useState('1');
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
        <Typography variant="h3" sx={{ margin: '2%' }} align="center">
          EMPLOYER DASHBOARD
        </Typography>
        <Button variant="outlined">
          <Link to="/">Home</Link>
        </Button>
      </Box>
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Create Post" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Create />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
