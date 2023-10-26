import { Button, Box, Flex, Form, NumberInput, Image, Text } from '@hubspot/ui-extensions';
import { useState, useMemo } from 'react';
import plus from "./Resources/plus.png"
import plusClicked from "./Resources/plusClicked.png"
import minus from "./Resources/minus.png"
import minusClicked from "./Resources/minusClicked.png"

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

  // Multiple statuses are needed to make the plus and minus buttons "glow" when clicked
  const [mhPlusSource, setMhPlusSource] = useState(plus)
  const [mhMinusSource, setMhMinusSource] = useState(minus)
  const [shPlusSource, setShPlusSource] = useState(plus)
  const [shMinusSource, setShMinusSource] = useState(minus)
  const [svhPlusSource, setSvhPlusSource] = useState(plus)
  const [svhMinusSource, setSvhMinusSource] = useState(minus)

  return (
    <Form>
      <Flex direction="column" gap="xs">
        {productSelection.includes('MH') && (
          <>
          <Text format={{ fontWeight: 'demibold' }}> Marketing Contacts </Text>
          <Flex direction='row' gap='small' align="center">
            <Image
              alt="A minus button"
              src={mhMinusSource}
              onClick={() => {
                setMhMinusSource(minusClicked)
                setTimeout(() => {
                  setMarketingContacts(Math.max(MARKETING_CONTACTS_MIN, marketingContacts - MARKETING_CONTACTS_MIN_ADD));
                  setMhMinusSource(minus)
                }, 50)
              }}
              width={20}
            />
            <Box flex={1}>
            <NumberInput
            //label={'Marketing Contacts'}
            name="marketingContactsNumber"
            //description={'Number of marketing contacts'}
            placeholder={'number of marketing contacts'}
            value={marketingContacts}
            min = {MARKETING_CONTACTS_MIN}
            max = {MARKETING_CONTACTS_MAX}
            onChange={value => handleMarketingContactsSelection(parseInt(value))}
            />
            </Box>
            <Image
              alt="A plus button"
              src={mhPlusSource}
              onClick={() => {
                setMhPlusSource(plusClicked)
                setTimeout(() => {
                  setMarketingContacts(Math.min(MARKETING_CONTACTS_MAX, marketingContacts + MARKETING_CONTACTS_MIN_ADD));
                  setMhPlusSource(plus)
                }, 50)
              }}
              width={20}
            />
          </Flex>
          </>
        )}
        {productSelection.includes('SH') && (
          <>
          <Text format={{ fontWeight: 'demibold' }}> Sales Seats </Text>
          <Flex direction='row' gap='small' align="center">
            <Image
              alt="A minus button"
              src={shMinusSource}
              onClick={() => {
                setShMinusSource(minusClicked)
                setTimeout(() => {
                  setSalesSeats(Math.max(SALES_SEATS_MIN, salesSeats - 1));
                  setShMinusSource(minus)
                }, 50)
              }}
              width={20}
            />
            <Box flex={1}>
            <NumberInput
            //label={'Sales Seats'}
            name="salesSeatsNumber"
            //description={'Number of sales seats'}
            placeholder={'number of sales seats'}
            value={salesSeats}
            min = {SALES_SEATS_MIN}
            onChange={value => setSalesSeats(parseInt(value))}
            />
            </Box>
            <Image
              alt="A plus button"
              src={shPlusSource}
              onClick={() => {
                setShPlusSource(plusClicked)
                setTimeout(() => {
                  setSalesSeats(Math.max(salesSeats + 1));
                  setShPlusSource(plus)
                }, 50)
              }}
              width={20}
            />
          </Flex>
          </>
        )}
        {productSelection.includes('SvH') && (
          <>
          <Text format={{ fontWeight: 'demibold' }}> Service Seats </Text>
          <Flex direction='row' gap='small' align="center">
            <Image
              alt="A minus button"
              src={svhMinusSource}
              onClick={() => {
                setSvhMinusSource(minusClicked)
                setTimeout(() => {
                  setServiceSeats(Math.max(SERVICE_SEATS_MIN, serviceSeats - 1));
                  setSvhMinusSource(minus)
                }, 50)
              }}
              width={20}
            />
            <Box flex={1}>
            <NumberInput
            //label={'Service Seats'}
            name="serviceSeatsNumber"
            //description={'Number of service seats'}
            placeholder={'number of service seats'}
            value={serviceSeats}
            min = {SERVICE_SEATS_MIN}
            onChange={value => setServiceSeats(parseInt(value))}
            />
            </Box>
            <Image
              alt="A plus button"
              src={svhPlusSource}
              onClick={() => {
                setSvhPlusSource(plusClicked)
                setTimeout(() => {
                  setServiceSeats(Math.max(serviceSeats + 1));
                  setSvhPlusSource(plus)
                }, 50)
              }}
              width={20}
            />
          </Flex>
          </>
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
