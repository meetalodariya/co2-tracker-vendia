import React, { FC, useEffect, useState, useCallback, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  GoogleMap,
  Marker,
  LoadScript,
  Polyline,
  DirectionsRenderer,
} from '@react-google-maps/api';

import { Transport } from '../types';
import seaRoutes from '../seaRoutes.json';

const center = { lat: 37.0902, lng: -95.7129 };

interface Props {
  open: boolean;
  handleClose: () => void;
  values: Transport;
}

const DirectionsDialog: FC<Props> = ({ open, handleClose, values }) => {
  const { origin, destination, transportationMethod } = values;
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const seaRoute = useMemo(
    () =>
      transportationMethod &&
      seaRoutes.find(
        (seaRoute) =>
          seaRoute._origin.name === origin.name &&
          seaRoute._destination.name === destination.name,
      ),
    [destination, origin, transportationMethod],
  );

  const zoomToObject = useCallback(
    (map) => {
      if (!map || !seaRoute) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      const points = seaRoute.paths;
      for (let n = 0; n < points.length; n++) {
        bounds.extend(points[n]);
      }
      map.setZoom(5);
      map.fitBounds(bounds);
    },
    [seaRoute],
  );

  const fetchDirections = useCallback(async () => {
    const directionsService = new google.maps.DirectionsService();
    const res = await directionsService.route({
      origin: new google.maps.LatLng({
        lat: origin.lat,
        lng: origin.lng,
      }),
      destination: new google.maps.LatLng({
        lat: destination.lat,
        lng: destination.lng,
      }),
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(res);
  }, [destination, origin]);

  const onMapLoad = useCallback(
    (map) => {
      setMap(map);
      if (transportationMethod === 'ground') {
        fetchDirections();
      } else {
        setTimeout(() => {
          zoomToObject(map);
        }, 500);
      }
    },
    [transportationMethod, fetchDirections, zoomToObject],
  );

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        data-testid='add-battery-dialog'
        onClose={handleClose}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Directions on Map
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box
            height='400px'
            width='100%'
            sx={{ padding: '10px' }}
            display={map ? 'block' : 'none'}
            component='div'
          >
            <LoadScript
              id='script-loader-sea-routes'
              googleMapsApiKey='AIzaSyAHGxc6pYJD0XOrz5av-IeHU3V36oX7ovM'
            >
              <GoogleMap
                center={center}
                zoom={1}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{
                  scaleControl: true,
                  streetViewControl: false,
                }}
                onLoad={onMapLoad}
              >
                {directionsResponse && (
                  <DirectionsRenderer directions={directionsResponse} />
                )}
                {transportationMethod === 'ship' && (
                  <>
                    <Polyline
                      options={seaRoute}
                      path={seaRoute.paths}
                      onLoad={(polyline) => {
                        // zoomToObject(polyline);
                      }}
                    />
                    <Marker
                      onLoad={(marker) => {
                        marker.setPosition(
                          new google.maps.LatLng({
                            lat: seaRoute._origin.lat,
                            lng: seaRoute._origin.lng,
                          }),
                        );
                        marker.setVisible(true);
                      }}
                      position={center}
                      visible={false}
                      label='A'
                    />
                    <Marker
                      onLoad={(marker) => {
                        marker.setPosition(
                          new google.maps.LatLng({
                            lat: seaRoute._destination.lat,
                            lng: seaRoute._destination.lng,
                          }),
                        );
                        marker.setVisible(true);
                      }}
                      position={center}
                      visible={false}
                      label='B'
                    />
                  </>
                )}
              </GoogleMap>
            </LoadScript>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DirectionsDialog;
