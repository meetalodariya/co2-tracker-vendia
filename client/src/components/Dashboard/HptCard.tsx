import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Skeleton } from '@mui/material';

import { HPTDetails } from './types';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface Props {
  data: HPTDetails;
}

const HptCard: FC<Props> = ({ data }) => {
  const { totalCo2, imageURL, serialNumber, components, transport, toolType } =
    formatData(data);
  const [expanded, setExpanded] = React.useState(false);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: 345 }}>
      <CardHeader
        title={`SN# ${serialNumber}`}
        subheader={'September 14, 2016'}
      />
      {!isImageLoaded && (
        <Skeleton sx={{ height: 194 }} animation='wave' variant='rectangular' />
      )}
      <img
        style={isImageLoaded ? {} : { display: 'none' }}
        height='194px'
        width='100%'
        src={imageURL}
        alt='Paella dish'
        onLoad={() => setIsImageLoaded(true)}
      />
      <CardContent>
        <>
          <Typography variant='body2' color='text.secondary'>
            <strong>Tool type:</strong> {toolType}
          </Typography>
          <br />
          <Typography variant='body2' color='text.secondary'>
            <strong>Total CO2:</strong> {totalCo2} kgCo2
          </Typography>
        </>
      </CardContent>
      <CardActions disableSpacing>
        <div>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography variant='h6'>CO2 breakdown:</Typography>
          <br />
          {components.map((component) => (
            <Typography
              variant='body2'
              color='text.secondary'
              key={component.serialNumber}
            >
              <strong>{capitalizeFirstLetter(component.type)}:</strong>{' '}
              {component.co2} kgCo2
            </Typography>
          ))}
          <Typography variant='body2' color='text.secondary'>
            <strong>Transport:</strong> {transport.co2} kgCo2
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const formatData = (data: HPTDetails) => {
  const { components, imageURL, serialNumber, toolType, transport } = data;

  const totalComponentC02 = components.reduce(
    (acc, current) => +current.co2 + acc,
    0,
  );

  const totalCo2 = totalComponentC02 + transport.co2;

  return {
    totalCo2,
    imageURL,
    serialNumber,
    components,
    transport,
    toolType,
  };
};

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default HptCard;
