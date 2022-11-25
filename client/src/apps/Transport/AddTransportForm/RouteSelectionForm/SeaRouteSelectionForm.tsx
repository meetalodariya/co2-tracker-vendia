import React, { useState, useRef, useCallback, FC, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import {
  GoogleMap,
  Marker,
  LoadScript,
  Polyline,
} from '@react-google-maps/api';
import WavesIcon from '@mui/icons-material/Waves';
import { useFormikContext } from 'formik';

import { secondsToDhms } from '../../../../utils/time';
import formModel from '../formModel';
import seaRoutePolylines from '../../seaRoutes.json';
import { AddTransportMethodForm } from '../formInitialValues';

const center = { lat: 37.0902, lng: -95.7129 };

const SeaRouteSelectionForm: FC = () => {
  const { errors, setFieldValue } = useFormikContext<AddTransportMethodForm>();
  const { origin } = errors;

  const [selectValue, setSelectValue] = useState(0);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const [{ distanceText, durationText }, setRouteDetails] = useState({
    distanceText: '',
    durationText: '',
  });
  const originMarkerRef = useRef<google.maps.Marker>();
  const destinationMarkerRef = useRef<google.maps.Marker>();
  const polylines = useRef<google.maps.Polyline[]>([]);
  const highlightPolyline = useRef<google.maps.Polyline>();

  useEffect(() => {
    resetVals();
  }, []);

  const resetVals = () => {
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
    setSelectValue(0);
  };

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

  const zoomToObject = useCallback(
    (obj) => {
      if (!map || !obj) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      const points = obj.getPath().getArray();
      for (let n = 0; n < points.length; n++) {
        bounds.extend(points[n]);
      }
      map.setZoom(4);
      map.fitBounds(bounds);
    },
    [map],
  );

  const onSelectChage = useCallback(
    (e) => {
      const seaRouteIndex = e.target.value;
      if (seaRouteIndex === 0) {
        resetVals();
      }
      const seaRoute = seaRoutePolylines[seaRouteIndex - 1];
      const polyline = polylines.current[seaRouteIndex - 1];

      setSelectValue(seaRouteIndex);
      setRouteDetails({
        distanceText: Math.floor(seaRoute._distance * 0.000621371192) + ' nmi',
        durationText: secondsToDhms(seaRoute._duration),
      });
      setFieldValue('origin', {
        [originName.name]: seaRoute._origin.name,
        [originLat.name]: seaRoute._origin.lat,
        [originLng.name]: seaRoute._origin.lng,
      });
      setFieldValue('destination', {
        [destinationName.name]: seaRoute._destination.name,
        [destinationLat.name]: seaRoute._destination.lat,
        [destinationLng.name]: seaRoute._destination.lng,
      });
      setFieldValue(distance.name, seaRoute._distance);
      setFieldValue(duration.name, seaRoute._duration);

      if (originMarkerRef.current) {
        originMarkerRef.current.setPosition(
          new google.maps.LatLng({
            lat: seaRoute._origin.lat,
            lng: seaRoute._origin.lng,
          }),
        );
        originMarkerRef.current.setVisible(true);
      }
      if (destinationMarkerRef.current) {
        destinationMarkerRef.current.setPosition(
          new google.maps.LatLng({
            lat: seaRoute._destination.lat,
            lng: seaRoute._destination.lng,
          }),
        );
        destinationMarkerRef.current.setVisible(true);
      }
      if (highlightPolyline.current) {
        highlightPolyline.current.setOptions({
          ...seaRoute,
          strokeColor: '#fff',
          strokeOpacity: 1,
          strokeWeight: 6,
          zIndex: 10,
        });
        highlightPolyline.current.setPath(seaRoute.paths);
        highlightPolyline.current.setVisible(true);
      }
      zoomToObject(polyline);
    },
    [
      resetVals,
      originName,
      destinationName,
      originLat,
      originLng,
      destinationLng,
      destinationLat,
      distance,
      duration,
      zoomToObject,
      setFieldValue,
    ],
  );

  return (
    <LoadScript
      id='script-loader-sea-routes'
      googleMapsApiKey='AIzaSyAHGxc6pYJD0XOrz5av-IeHU3V36oX7ovM'
    >
      <div style={{ padding: '0px 8px' }}>
        <Grid container columnSpacing={5} rowSpacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl
              sx={{ width: '100%' }}
              error={origin?.name && selectValue < 1}
            >
              <InputLabel>Select a route*</InputLabel>
              <Select
                value={selectValue}
                label='Select a route*'
                onChange={onSelectChage}
                color='secondary'
                autoFocus
              >
                <MenuItem value={0}>
                  <em>None</em>
                </MenuItem>
                {seaRoutePolylines.map((seaRoute, index) => {
                  const seaRouteText = (
                    <>
                      <span
                        style={{
                          color: 'rgba(0, 0, 0, 0.87)',
                          fontWeight: 500,
                          paddingRight: '4px',
                        }}
                      >
                        {seaRoute._origin.name}
                      </span>
                      <span
                        style={{
                          color: 'rgba(0, 0, 0, 0.38)',
                          fontWeight: 500,
                          //   fontStyle: 'italic',
                        }}
                      >
                        to
                      </span>
                      <span
                        style={{
                          color: 'rgba(0, 0, 0, 0.87)',
                          fontWeight: 500,
                          paddingLeft: '4px',
                        }}
                      >
                        {seaRoute._destination.name}
                      </span>
                    </>
                  );

                  return (
                    <MenuItem key={index} value={index + 1}>
                      {seaRouteText}
                    </MenuItem>
                  );
                })}
              </Select>
              {origin?.name && selectValue < 1 && (
                <FormHelperText>Please select the route</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={6} spacing={1} alignItems='center'>
            <Grid item xs={12}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <WavesIcon color='secondary'></WavesIcon>
                Sea Distance:{' '}
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
            zoom={1}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              scaleControl: true,
              streetViewControl: false,
            }}
            onLoad={(map) => {
              setMap(map);
            }}
          >
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
            {seaRoutePolylines.map((seaRoutePolyline) => {
              return (
                <Polyline
                  key={seaRoutePolyline._origin.name}
                  onLoad={(polyline) => {
                    polylines.current.push(polyline);
                  }}
                  options={seaRoutePolyline}
                  path={seaRoutePolyline.paths}
                />
              );
            })}
            <Polyline
              onLoad={(polyline) => {
                highlightPolyline.current = polyline;
              }}
              visible={false}
            />
          </GoogleMap>
        </Box>
      </div>
    </LoadScript>
  );
};

export default SeaRouteSelectionForm;
