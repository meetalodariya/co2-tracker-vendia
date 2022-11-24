import React, { useCallback, useState } from 'react';
import { Formik, Form } from 'formik';
import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import formInitialValues, { AddTransportMethodForm } from './formInitialValues';
import validationSchema from './validationSchema';
import TransportDetailsForm from './TransportDetailsForm';
import ReviewDetails from './ReviewDetails';
import RouteSelectionForm from './RouteSelectionForm';
import { useAuth } from '../../../providers/auth';

import transportImg from '../transportImg.json';
import { Transport } from '../types';

const steps = ['Transport details', 'Route selection', 'Review the details'];

function renderStepContent(step) {
  return (
    <>
      <div style={{ display: step === 0 ? 'unset' : 'none' }}>
        <TransportDetailsForm />
      </div>
      <div style={{ display: step === 1 ? 'unset' : 'none' }}>
        <RouteSelectionForm />
      </div>
      <div style={{ display: step === 2 ? 'unset' : 'none' }}>
        <ReviewDetails />
      </div>
    </>
  );
}

const AddTransportForm = ({ handleClose }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const initialValues: AddTransportMethodForm = formInitialValues;

  const mutation = useMutation(
    (data: Partial<Transport>) =>
      axios.post('http://localhost:8001/transport', data, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAllTransportRoutes');
        handleClose();
      },
    },
  );

  const handleSubmit = useCallback(
    async (values: AddTransportMethodForm, actions) => {
      if (isLastStep) {
        const transportImgs = transportImg[values.transportationMethod];

        mutation.mutate({
          ...values,
          imageURL:
            transportImgs[Math.floor(Math.random() * transportImgs.length)],
        });
      } else {
        setActiveStep(activeStep + 1);
        actions.setTouched({});
        actions.setSubmitting(false);
      }
    },
    [isLastStep, activeStep, mutation],
  );

  function handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
      <Stepper
        activeStep={activeStep}
        style={{
          padding: '12px 0px 40px',
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        <Formik
          initialValues={initialValues}
          validationSchema={currentValidationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={false}
        >
          {() => (
            <Form id={'add-transport-form'}>
              {renderStepContent(activeStep)}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    style={{ marginTop: '24px', marginLeft: '8px' }}
                  >
                    Back
                  </Button>
                )}
                <div
                  style={{
                    margin: '8px',
                    position: 'relative',
                  }}
                >
                  <Button
                    disabled={mutation.isLoading}
                    type='submit'
                    variant='contained'
                    color='primary'
                    style={{ marginTop: '24px', marginLeft: '8px' }}
                  >
                    {isLastStep ? 'Submit' : 'Next'}
                  </Button>
                  {mutation.isLoading && (
                    <CircularProgress
                      size={24}
                      style={{ position: 'absolute', top: '50%', left: '50%' }}
                    />
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    </React.Fragment>
  );
};

export default AddTransportForm;
