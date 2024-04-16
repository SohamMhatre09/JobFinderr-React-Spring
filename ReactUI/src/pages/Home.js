import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Home.css'; // Import external CSS file

const Home = () => {
  return (
    <div className="container">
      <Typography variant="h3" className="heading">
        Get Hired or Hire People for Free!
      </Typography>
      <div className="flex gap-4">
        <Button variant="outlined" className="button">
          <Link to="/employer/dashboard" className="link">
            Hire Talent
          </Link>
        </Button>
        <Button variant="outlined" className="button">
          <Link to="/employee/feed" className="link">
            Get Job Now
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
