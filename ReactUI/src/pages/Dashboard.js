import React, { useState } from 'react';
import { Box, Tab, Typography, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Link } from 'react-router-dom';
import Create from './Create';
import './Dashboard.css'

export default function Home() {
  const [value, setValue] = useState('1');
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box className='container'>
        <Typography variant="h3" className='heading'>
          EMPLOYER DASHBOARD
        </Typography>
        <Button variant="outlined">
          <Link to="/" className='link-button'>Home</Link>
        </Button>
      </Box>
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
          <Box className='tab-list'>
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
