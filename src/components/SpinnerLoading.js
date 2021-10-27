import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const SpinnerLoading = () => {
    return (
      <Box sx={{ color: '#1AA6B7' }} >
          <CircularProgress color="inherit" />
      </Box>
    )
}

export default SpinnerLoading
