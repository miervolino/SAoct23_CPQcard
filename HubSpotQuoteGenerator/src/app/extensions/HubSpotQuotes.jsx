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
hubspot.extend(({runServerlessFunction }) => (
  <HubSpotQuotes runServerless={runServerlessFunction} />
));

const HubSpotQuotes = ({ runServerless }) => {
  const [step, setStep] = useState(Steps.QuotesView);
  const [loading, setLoading] = useState(false);

  const [packSelection, setPackSelection] = useState();
  const [prevPackSelection, setPrevPackSelection] = useState(); //The previous pack selection if you hit back
  const [productSelection, setproductSelection] = useState();
  const [prevProductSelection, setPrevProductSelection] = useState(); //The previous pack selection if you hit back
  const [mhSelection, setMhSelection] = useState()
  const [prevMhSelection, setPrevMhSelection] = useState()
  const [shSelection, setShSelection] = useState()
  const [prevShSelection, setPrevShSelection] = useState()
  const [svhSelection, setSvhSelection] = useState()
  const [prevSvhSelection, setPrevSvhSelection] = useState()

  const [marketingContacts, setMarketingContacts] = useState();
  const [salesSeats, setSalesSeats] = useState();
  const [serviceSeats, setServiceSeats] = useState();

  const updateAmount = () => {
    console.log("Beginning of updateAmount:");
    const dealId = '15546494580';
    const amount = 1500;
    console.log(dealId)
    console.log(amount)
    // setLoading(true);
    // Execute serverless function to generate a quote
    console.log("updateAmount - before runServerless:");
    return runServerless({
      name: 'calculateAmount',
      propertiesToSend: ['hs_object_id'],
      parameters: { amount },
      //payload,
    });
  };

  const handleproductSelection = ({ packSelection, productSelection, mhSelection, shSelection, svhSelection}) => {
    // Save pack and products selection form data
    setPackSelection(packSelection);
    setproductSelection(productSelection);
    setMhSelection(mhSelection);
    setShSelection(shSelection);
    setSvhSelection(svhSelection);
    setStep(Steps.Details);
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
              stepNames={['Product', 'Details', 'Addons']}
            />
          )}
          {step === Steps.QuotesView && (
            <QuotesView onNext={() => setStep(Steps.ProductSelection)} />
          )}
          {step === Steps.ProductSelection && (
            <ProductSelection
            prevPackSelection={prevPackSelection}
            prevProductSelection={prevProductSelection}
            prevMhSelection={prevMhSelection}
            prevShSelection={prevShSelection}
            prevSvhSelection={prevSvhSelection}
            onNext={handleproductSelection}
            onBack={() => setStep(Steps.QuotesView)} />
          )}
          {step === Steps.Details && (
            <Details 
            packSelection={packSelection}
            productSelection={productSelection}
            mhSelection={mhSelection}
            shSelection={shSelection}
            svhSelection={svhSelection}  
            onNext={() => setStep(Steps.Addons) }
            onBack={(prevPackSelection, prevProductSelection, prevMhSelection, prevShSelection, prevSvhSelection) =>
                      {setPrevPackSelection(prevPackSelection)
                       setPrevProductSelection(prevProductSelection)
                       setPrevMhSelection(prevMhSelection)
                       setPrevShSelection(prevShSelection)
                       setPrevSvhSelection(prevSvhSelection)
                       setStep(Steps.ProductSelection)}}
            />
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
