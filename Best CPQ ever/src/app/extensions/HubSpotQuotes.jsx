import React, { useState } from 'react';
import { hubspot } from '@hubspot/ui-extensions';
import { LoadingSpinner, Flex, StepIndicator } from '@hubspot/ui-extensions';
import { QuotesView } from './components/QuotesView.jsx';
import { ProductSelection } from './components/ProductSelection.jsx';
import { Details } from './components/Details.jsx';
import { Addons } from './components/Addons.jsx';
import { QuoteName } from './components/QuoteName.jsx';

const Steps = {
  QuotesView: 0,
  ProductSelection: 1,
  Details: 2,
  Addons: 3,
  QuoteName: 4,
};

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ runServerlessFunction }) => (
  <HubSpotQuotes runServerless={runServerlessFunction} />
));

const HubSpotQuotes = ({ runServerless }) => {
  const [step, setStep] = useState(Steps.QuotesView);
  const [passengers, setPassengers] = useState();
  const [distance, setDistance] = useState();
  const [sku, setSku] = useState();
  const [numberOfBuses, setNumberOfBuses] = useState();
  const [loading, setLoading] = useState(false);

  const updateAmount = () => {
    console.log("HERE!");
    // setLoading(true);
    // Execute serverless function to generate a quote
    return runServerless({
      name: 'calculateAmount',
      propertiesToSend: ['hs_object_id'],
      amount: 1500,
      //payload,
    });
  };

  const handleQuoteName = ({ quoteName }) => {
    setLoading(true);
    // Generate a quote and render initial view
    generateQuote({ distance, sku, numberOfBuses, quoteName }).then(() => {
      setLoading(false);
      setStep(Steps.QuotesView);
    });
  };

  return (
    <>
      {loading == false && (
        <Flex direction="column" gap="xs">
          {/* Render a step indicator  */}
          {step != Steps.QuotesView && (
            <StepIndicator
              currentStep={step - 1}
              stepNames={['Product', 'details', 'add ons']}
            />
          )}
          {step === Steps.QuotesView && (
            <QuotesView onNext={() => setStep(Steps.ProductSelection)} />
          )}
          {step === Steps.ProductSelection && (
            <ProductSelection onNext={() => setStep(Steps.Details)} />
          )}
          {step === Steps.Details && (
            <Details onNext={() => setStep(Steps.Addons)} />
          )}
          {step === Steps.Addons && (
            <Addons onNext={updateAmount} />
          )}
        </Flex>
      )}
      {/* If loading, show a spinner */}
      {loading === true && <LoadingSpinner />}
    </>
  );
};
