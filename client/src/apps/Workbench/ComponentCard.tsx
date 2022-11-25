import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const ComponentCard = ({ imageURL, serialNumber, cardContent }) => {
  return (
    <>
      <Card
        sx={{
          display: 'flex',
          width: '100%',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          marginBottom: '6px',
          borderRadius: '10px',
          height: '100px',
        }}
      >
        <div style={{ height: 100, width: 100 }}>
          <CardMedia
            component='img'
            height='100'
            sx={{ width: 100, borderRadius: '10px' }}
            src={imageURL}
            alt={serialNumber}
          />
        </div>
        <CardContent sx={{ padding: '16px', width: '100%' }}>
          {cardContent}
        </CardContent>
      </Card>
    </>
  );
};

export default ComponentCard;
