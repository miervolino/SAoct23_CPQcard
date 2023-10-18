import { Button, Box, Select, Form, NumberInput } from '@hubspot/ui-extensions';
import { useState, useMemo } from 'react';

export const Details = ({ passengers, onNext }) => {
  const MARKETING_CONTACTS_DEFAULT = 2000;
  const SALES_SEATS_DEFAULT = 5;
  const SERVICE_SEATS_DEFAULT = 5;

  const [marketingContacts, setMarketingContacts] = useState(MARKETING_CONTACTS_DEFAULT);
  const [salesSeats, setSalesSeats] = useState(SALES_SEATS_DEFAULT);
  const [serviceSeats, setServiceSeats] = useState(SERVICE_SEATS_DEFAULT);


  const handleNextButtonClick = () => {
    
  };


  return (
    <Form>
      <NumberInput
      label={'Marketing Contacts'}
      name="marketingContactsNumber"
      description={'Number of marketing contacts'}
      placeholder={'number of marketing contacts'}
      value={marketingContacts}
      onChange={value => setMarketingContacts(value)}
      /><NumberInput
      label={'Sales Seats'}
      name="salesSeatsNumber"
      description={'Number of sales seats'}
      placeholder={'number of sales seats'}
      value={salesSeats}
      onChange={value => setSalesSeats(value)}
      /><NumberInput
      label={'Service Seats'}
      name="serviceSeatsNumber"
      description={'Number of service seats'}
      placeholder={'number of service seats'}
      value={serviceSeats}
      onChange={value => setServiceSeats(value)}
/>
      <Box>
      <Button
      onClick={() => onNext()}
      variant="secondary"
      type="button"
    >
      Next
    </Button>
      </Box>
    </Form>
  );
};
