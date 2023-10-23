import { Button, Box, Flex, Form, NumberInput } from '@hubspot/ui-extensions';
import { useState, useMemo } from 'react';

export const Details = ({ packSelection, productSelection, mhSelection, shSelection, svhSelection,
                          onNext, onBack }) => {
  const MARKETING_CONTACTS_MIN =
    mhSelection == "Marketing Starter"      ? 1000  :
    mhSelection == "Marketing Professional" ? 2000  :
                                              10000 ; // "Marketing Enterprise"
  const MARKETING_CONTACTS_MAX =
    mhSelection == "Marketing Starter"      ? 100000  :
    mhSelection == "Marketing Professional" ? 87000   :
                                              1000000 ; // "Marketing Enterprise"
  const MARKETING_CONTACTS_MIN_ADD =
    mhSelection == "Marketing Starter"      ? 1000  :
    mhSelection == "Marketing Professional" ? 5000  :
                                              10000 ; // "Marketing Enterprise"
  const SALES_SEATS_MIN =
    shSelection == "Sales Starter"      ? 2  :
    shSelection == "Sales Professional" ? 5  :
                                          10 ; // "Sales Enterprise"
  const SERVICE_SEATS_MIN =
    svhSelection == "Service Starter"      ? 2  :
    svhSelection == "Service Professional" ? 5  :
                                             10 ; // "Service Enterprise"

  const [marketingContacts, setMarketingContacts] = useState(MARKETING_CONTACTS_MIN);
  const [salesSeats, setSalesSeats] = useState(SALES_SEATS_MIN);
  const [serviceSeats, setServiceSeats] = useState(SERVICE_SEATS_MIN);

  function handleMarketingContactsSelection (userSelection) {
    const forcedSelection = (Math.ceil((userSelection-MARKETING_CONTACTS_MIN)
                                        /MARKETING_CONTACTS_MIN_ADD)
                            *MARKETING_CONTACTS_MIN_ADD)
                            +MARKETING_CONTACTS_MIN;
    /* This would be the easy formula if MHP didn't have a different minimum purchasable and minimum additional package
    const forcedSelection = Math.floor(userSelection/MARKETING_CONTACTS_MIN)
                            *MARKETING_CONTACTS_MIN; */
    //console.log(forcedSelection)
    setMarketingContacts(forcedSelection);
  }


  const handleNextButtonClick = () => {
    
  };


  return (
    <Form>
      <Flex direction="column" gap="xs">
        {productSelection.includes('MH') && (
          <NumberInput
          label={'Marketing Contacts'}
          name="marketingContactsNumber"
          description={'Number of marketing contacts'}
          placeholder={'number of marketing contacts'}
          value={marketingContacts}
          min = {MARKETING_CONTACTS_MIN}
          max = {MARKETING_CONTACTS_MAX}
          onChange={value => handleMarketingContactsSelection(parseInt(value))}
          />
        )}
        {productSelection.includes('SH') && (
          <NumberInput
          label={'Sales Seats'}
          name="salesSeatsNumber"
          description={'Number of sales seats'}
          placeholder={'number of sales seats'}
          value={salesSeats}
          min = {SALES_SEATS_MIN}
          onChange={value => setSalesSeats(parseInt(value))}
          />
        )}
        {productSelection.includes('SvH') && (
          <NumberInput
          label={'Service Seats'}
          name="serviceSeatsNumber"
          description={'Number of service seats'}
          placeholder={'number of service seats'}
          value={serviceSeats}
          min = {SERVICE_SEATS_MIN}
          onChange={value => setServiceSeats(parseInt(value))}
          />
        )}
        <Box>
        <Button
          onClick={() => {onBack(packSelection, productSelection, mhSelection, shSelection, svhSelection)}}
          variant="secondary"
          type="button"
        >
          Back
        </Button>
        <Button
          onClick={() => onNext(marketingContacts, salesSeats, serviceSeats)}
          variant="primary"
          type="button"
        >
          Next
        </Button>
        </Box>
      </Flex>
    </Form>
  );
};
