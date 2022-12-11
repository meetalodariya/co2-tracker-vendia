import React from 'react';
import { useFormikContext } from 'formik';
import SeaRouteSelectionForm from './SeaRouteSelectionForm';
import GroundRouteSelectionForm from './GroundRouteSelectionForm';
import { AddTransportMethodForm } from '../formInitialValues';

const renderRouteSelectionForm = (transportationMethod) => {
  switch (transportationMethod) {
    case 'ship':
      return <SeaRouteSelectionForm />;
    case 'ground':
      return <GroundRouteSelectionForm />;
    default:
      return null;
  }
};

const RouteSelectionForm = () => {
  const { values } = useFormikContext<AddTransportMethodForm>();
  return <div>{renderRouteSelectionForm(values.transportationMethod)}</div>;
};

export default RouteSelectionForm;
