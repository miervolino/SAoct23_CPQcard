import { Flex, Button, Box, Image, ToggleGroup, Table, TableHead, TableBody, TableRow, TableCell, TableHeader, NumberInput } from '@hubspot/ui-extensions';
import { useState, useMemo } from 'react';
import plus from "./Resources/plus.png"
import minus from "./Resources/minus.png"

export const Addons = ({ onNext, onBack, productsSelection }) => {

  // Add-Ons
  const [dedicatedIpIncluded, setDedicatedIpIncluded] = useState(false)
  const [dedicatedIpQuantity, setDedicatedIpQuantity] = useState(0)
  const [transactionalEmailIncluded, setTransactionalEmailIncluded] = useState(false)
  const [transactionalEmailQuantity, setTransactionalEmailQuantity] = useState(0)
  const [businessUnitsIncluded, setBusinessUnitsIncluded] = useState(false)
  const [businessUnitsQuantity, setBusinessUnitsQuantity] = useState(0)

  // Limit Increases
  const [reportingIncluded, setReportingIncluded] = useState(false)
  const [reportingQuantity, setReportingQuantity] = useState(0)
  const [apiIncluded, setApiIncluded] = useState(false)
  const [apiQuantity, setApiQuantity] = useState(0)
  const [domainsIncluded, setDomainsIncluded] = useState(false)
  const [domainsQuantity, setDomainsQuantity] = useState(0)

  const minQuantity = 1

  const addOns = [
    {
      name: 'Dedicated IP',
      included: dedicatedIpIncluded,
      setIncluded: setDedicatedIpIncluded,
      quantity: dedicatedIpQuantity,
      setQuantity: setDedicatedIpQuantity,
      maxQuantity: 1,
      dependencies: ['Marketing Professional', 'Marketing Enterprise'],
      price: 300,
    },
    {
      name: 'Transactional Email',
      included: transactionalEmailIncluded,
      setIncluded: setTransactionalEmailIncluded,
      quantity: transactionalEmailQuantity,
      setQuantity: setTransactionalEmailQuantity,
      maxQuantity: 1,
      dependencies: ['Marketing Professional', 'Marketing Enterprise'],
      price: 600
    },
    {
      name: 'Business Units',
      included: businessUnitsIncluded,
      setIncluded: setBusinessUnitsIncluded,
      quantity: businessUnitsQuantity,
      setQuantity: setBusinessUnitsQuantity,
      maxQuantity: 50,
      dependencies: ['Marketing Professional', 'Marketing Enterprise'],
      price: 600
    },
  ];

  const limitIncreases = [
    {
      name: 'Reporting',
      included: reportingIncluded,
      setIncluded: setReportingIncluded,
      quantity: reportingQuantity,
      setQuantity: setReportingQuantity,
      maxQuantity: 50,
      dependencies: ['Marketing Professional', 'Marketing Enterprise',
                   'Sales Professional', 'Sales Enterprise',
                   'Service Professional', 'Service Enterprise'],
      price: 200
    },
    {
      name: 'API',
      included: apiIncluded,
      setIncluded: setApiIncluded,
      quantity: apiQuantity,
      setQuantity: setApiQuantity,
      maxQuantity: 50,
      dependencies: ['Marketing Starter', 'Marketing Professional', 'Marketing Enterprise',
                   'Sales Starter', 'Sales Professional', 'Sales Enterprise',
                   'Service Starter', 'Service Professional', 'Service Enterprise'],
      price: 500
    },
    {
      name: 'Domains',
      included: domainsIncluded,
      setIncluded: setDomainsIncluded,
      quantity: domainsQuantity,
      setQuantity: setDomainsQuantity,
      maxQuantity: 50,
      dependencies: ['Marketing Enterprise', 'Service Enterprise'],
      price: 100
    },
  ];  

  return (
    <>
      <Table 
        bordered={true}
        paginated={false}
        pageCount="1"
      >
        {['Marketing Professional', 'Marketing Enterprise'].some(el => productsSelection.includes(el)) && (
        <TableHead>
          <TableRow>
            <TableHeader width="min">Select</TableHeader>
            <TableHeader>Add-Ons</TableHeader>
            <TableHeader>Quantities</TableHeader>
            <TableHeader>Price</TableHeader>
          </TableRow>
        </TableHead>
        )}
        <TableBody>
          {addOns.map((addOn) => {
            if (addOn.dependencies.some(el => productsSelection.includes(el))) {
              return <TableRow>
                      <TableCell>
                        <ToggleGroup
                          options={[{value: (addOn.name, " included")}]}
                          toggleType="checkboxList"
                          onChange={() => {
                            addOn.setIncluded(!addOn.included);
                            console.log(addOn.included)
                          }}
                        />
                      </TableCell>
                      <TableCell>{addOn.name}</TableCell>
                      <TableCell>
                        <Flex direction='row' gap='small' align="center">
                          <Image
                            alt="A minus button"
                            src={minus}
                            onClick={() => {
                              if(addOn.included == true){
                                addOn.setQuantity((Math.max(minQuantity, addOn.quantity - 1)));
                              }
                            }}
                            width={20}
                          />
                          <NumberInput
                            placeholder={'Add-Ons needed'}
                            value={addOn.quantity}
                            readOnly={!addOn.included}
                            onChange={value => {addOn.setQuantity(parseInt(value))}}
                            error={addOn.included && (addOn.quantity == 0)}
                            min={minQuantity}
                            max={addOn.maxQuantity}
                          />
                          <Image
                            alt="A plus button"
                            src={plus}
                            onClick={() => {
                              if(addOn.included == true){
                                addOn.setQuantity((Math.min(addOn.maxQuantity, addOn.quantity + 1)));
                              }
                            }}
                            width={20}
                          />
                        </Flex>
                      </TableCell>
                      <TableCell>${addOn.price}</TableCell>
                    </TableRow>
            }
          })}
        </TableBody>
        <TableHead>
          <TableRow>
            <TableHeader width="min">Select</TableHeader>
            <TableHeader>Limit Increases</TableHeader>
            <TableHeader>Quantities</TableHeader>
            <TableHeader>Price</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {limitIncreases.map((limitIncrease) => {
            if (limitIncrease.dependencies.some(el => productsSelection.includes(el))) {
              return <TableRow>
                      <TableCell>
                        <ToggleGroup
                          options={[{value: (limitIncrease.name, " included")}]}
                          toggleType="checkboxList"
                          onChange={() => {
                            limitIncrease.setIncluded(!limitIncrease.included);
                          }}
                        />
                      </TableCell>
                      <TableCell>{limitIncrease.name}</TableCell>
                      <TableCell>
                        <Flex direction='row' gap='small' align="center">
                          <Image
                            alt="A minus button"
                            src={minus}
                            onClick={() => {
                              if(limitIncrease.included == true){
                                limitIncrease.setQuantity((Math.max(minQuantity, limitIncrease.quantity - 1)));
                              }
                            }}
                            width={20}
                          />
                          <NumberInput
                            placeholder={'Limit Increases needed'}
                            value={limitIncrease.quantity}
                            readOnly={!limitIncrease.included}
                            onChange={value => {limitIncrease.setQuantity(parseInt(value))}}
                            error={limitIncrease.included && (limitIncrease.quantity == 0)}
                            min={minQuantity}
                            max={limitIncrease.maxQuantity}
                          />
                          <Image
                            alt="A plus button"
                            src={plus}
                            onClick={() => {
                              if(limitIncrease.included == true){
                                limitIncrease.setQuantity((Math.min(limitIncrease.maxQuantity, limitIncrease.quantity + 1)));
                              }
                            }}
                            width={20}
                          />
                        </Flex>
                      </TableCell>
                      <TableCell>${limitIncrease.price}</TableCell>
                    </TableRow>
            }
          })}
        </TableBody>
      </Table>
      <Box>
        <Button
          onClick={() => onBack()}
          variant="secondary"
          type="button"
        >
          Back
        </Button>
        <Button
          onClick={() => onNext()}
          variant="primary"
          type="button"
        >
          Next
        </Button>
      </Box>
    </>
  );
};

/* Examples of variables to declare
const [addOn1Included, setAddOn1Included] = useState(false)
const [addOn1Quantity, setAddOn1Quantity] = useState(0)
const [addOn2Included, setAddOn2Included] = useState(false)
const [addOn2Quantity, setAddOn2Quantity] = useState(0)
const [limitIncrease1Included, setLimitIncrease1Included] = useState(false)
const [limitIncrease1Quantity, setLimitIncrease1Quantity] = useState(0)

const addOns = [
  {
    name: 'Add-On 1',
    included: addOn1Included,
    setIncluded: setAddOn1Included,
    quantity: addOn1Quantity,
    setQuantity: setAddOn1Quantity,
    dependency: 'MH'
  },
  {
    name: 'Add-On 2',
    included: addOn2Included,
    setIncluded: setAddOn2Included,
    quantity: addOn2Quantity,
    setQuantity: setAddOn2Quantity,
    dependency: 'MH'
  },
];

const limitIncreases = [
  {
    name: 'Limit Increase 1',
    included: limitIncrease1Included,
    setIncluded: setLimitIncrease1Included,
    quantity: limitIncrease1Quantity,
    setQuantity: setLimitIncrease1Quantity,
    dependency: 'MH'
  },
];
*/

