import React, { useState, useRef, useCallback, FC, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RouteIcon from '@mui/icons-material/Route';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  LoadScript,
} from '@react-google-maps/api';
import TextField from '@mui/material/TextField';
import { useFormikContext } from 'formik';

import formModel from '../formModel';
import { AddTransportMethodForm } from '../formInitialValues';

const center = { lat: 37.0902, lng: -95.7129 };

const defaultBounds = {
  north: center.lat + 0.1,
  south: center.lat - 0.1,
  east: center.lng + 0.1,
  west: center.lng - 0.1,
};

const autocompleteOpts = {
  bounds: defaultBounds,
  componentRestrictions: { country: 'us' },
  fields: ['address_components', 'geometry', 'icon', 'name'],
  strictBounds: false,
  types: ['establishment'],
};

const libraries: Array<
  'geometry' | 'places' | 'drawing' | 'localContext' | 'visualization'
> = ['places'];

const GroundRouteSelectionForm: FC = () => {
  const { errors, setFieldValue } = useFormikContext<AddTransportMethodForm>();
  const { origin, destination } = errors;

  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [{ distanceText, durationText }, setRouteDetails] = useState({
    distanceText: '',
    durationText: '',
  });
  const originAutocompleteRef = useRef<google.maps.places.Autocomplete>();
  const destinationAutocompleteRef = useRef<google.maps.places.Autocomplete>();
  const originMarkerRef = useRef<google.maps.Marker>();
  const destinationMarkerRef = useRef<google.maps.Marker>();

  useEffect(() => {
    setFieldValue('origin', {
      [originName.name]: '',
      [originLat.name]: '',
      [originLng.name]: '',
    });
    setFieldValue('destination', {
      [destinationName.name]: '',
      [destinationLat.name]: '',
      [destinationLng.name]: '',
    });
    setFieldValue(distance.name, '');
    setFieldValue(duration.name, '');
  }, []);

  const {
    formField: {
      originName,
      destinationName,
      originLat,
      originLng,
      destinationLng,
      destinationLat,
      distance,
      duration,
    },
  } = formModel;

  const calculateRoute = useCallback(async () => {
    if (!originMarkerRef.current || !destinationMarkerRef.current) {
      return;
    }

    const isOriginSet = originMarkerRef.current.getVisible();
    const isDestinationSet = destinationMarkerRef.current.getVisible();

    if (!isOriginSet || !isDestinationSet) {
      return;
    }

    const originLocation = originMarkerRef.current.getPosition();
    const destinationLocation = destinationMarkerRef.current.getPosition();

    if (!originLocation || !destinationLocation) {
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originLocation,
      destination: destinationLocation,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    if (originMarkerRef.current) {
      originMarkerRef.current.setVisible(false);
    }
    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.setVisible(false);
    }

    setRouteDetails({
      distanceText: results.routes[0].legs[0].distance.text,
      durationText: results.routes[0].legs[0].duration.text,
    });
    setFieldValue(distance.name, results.routes[0].legs[0].distance?.value);
    setFieldValue(duration.name, results.routes[0].legs[0].duration?.value);
  }, [distance.name, duration.name, setFieldValue]);

  const originPlaceChanged = useCallback(() => {
    if (originAutocompleteRef.current) {
      const placeRes = originAutocompleteRef.current.getPlace();
      if (!placeRes.geometry?.location) {
        return;
      }

      setFieldValue('origin', {
        [originName.name]: placeRes.name,
        [originLat.name]: placeRes.geometry.location.lat(),
        [originLng.name]: placeRes.geometry.location.lng(),
      });

      if (originMarkerRef.current) {
        originMarkerRef.current.setPosition(placeRes.geometry.location);
        originMarkerRef.current.setVisible(true);
      }

      calculateRoute();
    }
  }, [
    originName.name,
    setFieldValue,
    calculateRoute,
    originLat.name,
    originLng.name,
  ]);

  const destinationPlaceChanged = useCallback(() => {
    if (destinationAutocompleteRef.current) {
      const placeRes = destinationAutocompleteRef.current.getPlace();
      if (!placeRes.geometry?.location) {
        return;
      }

      setFieldValue('destination', {
        [destinationName.name]: placeRes.name,
        [destinationLat.name]: placeRes.geometry.location.lat(),
        [destinationLng.name]: placeRes.geometry.location.lng(),
      });

      if (destinationMarkerRef.current) {
        destinationMarkerRef.current.setPosition(placeRes.geometry.location);
        destinationMarkerRef.current.setVisible(true);
      }

      calculateRoute();
    }
  }, [
    calculateRoute,
    destinationLat.name,
    destinationLng.name,
    destinationName.name,
    setFieldValue,
  ]);

  return (
    <LoadScript
      id='script-loader'
      googleMapsApiKey='AIzaSyAHGxc6pYJD0XOrz5av-IeHU3V36oX7ovM'
      libraries={libraries}
    >
      <div style={{ padding: '0px 8px' }}>
        <Grid container columnSpacing={5} rowSpacing={3}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              onLoad={(autocomplete) => {
                originAutocompleteRef.current = autocomplete;
              }}
              onPlaceChanged={originPlaceChanged}
              options={autocompleteOpts}
            >
              <TextField
                variant='outlined'
                color='secondary'
                type='text'
                name={originName.name}
                label={originName.label}
                fullWidth
                sx={{ marginBottom: '10px' }}
                autoFocus
                helperText={origin?.name}
                onChange={(e) => {
                  setFieldValue('origin', {
                    [originName.name]: '',
                    [originLat.name]: '',
                    [originLng.name]: '',
                  });
                }}
                error={!!origin?.name}
              />
            </Autocomplete>
            <Autocomplete
              onLoad={(autocomplete) => {
                destinationAutocompleteRef.current = autocomplete;
              }}
              onPlaceChanged={destinationPlaceChanged}
              options={autocompleteOpts}
            >
              <TextField
                color='secondary'
                variant='outlined'
                name={destinationName.name}
                label={destinationName.label}
                error={!!destination?.name}
                helperText={destination?.name}
                fullWidth
                onChange={(e) => {
                  setFieldValue('destination', {
                    [destinationName.name]: '',
                    [destinationLat.name]: '',
                    [destinationLng.name]: '',
                  });
                }}
              />
            </Autocomplete>
          </Grid>
          <Grid item container xs={12} sm={6} spacing={1} alignItems='center'>
            <Grid item xs={12}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <RouteIcon color='secondary'></RouteIcon>
                Driving Distance:{' '}
                <span>{distanceText ? distanceText : '-- --'}</span>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <AccessTimeFilledIcon color='secondary'></AccessTimeFilledIcon>
                Duration: <span>{durationText ? durationText : '-- --'}</span>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Box height='300px' width='100%' sx={{ marginTop: '20px' }}>
          <GoogleMap
            center={center}
            zoom={3}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              scaleControl: true,
              streetViewControl: false,
            }}
          >
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
            <Marker
              onLoad={(marker) => {
                originMarkerRef.current = marker;
              }}
              position={center}
              visible={false}
              label='A'
            />
            <Marker
              onLoad={(marker) => {
                destinationMarkerRef.current = marker;
              }}
              position={center}
              visible={false}
              label='B'
            />
          </GoogleMap>
        </Box>
      </div>
    </LoadScript>
  );
};

export default GroundRouteSelectionForm;
