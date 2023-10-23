import React, { useState } from 'react';
import { Flex, Form, Text, Button, Box, ToggleGroup, Select } from '@hubspot/ui-extensions';

export const ProductSelection = ({ prevPackSelection, prevProductSelection, prevMhSelection, prevShSelection, prevSvhSelection,
                                   onNext, onBack }) => {
  //const PACK_DEFAULT = "Professional Suite";
  const PACK_DEFAULT = prevPackSelection !== undefined ?
                       prevPackSelection               :
                       "Professional Suite"            ;
  const SUITE_DEFAULT = ["MH", "SH", "SvH"];
  const PRODUCTS_DEFAULT = prevProductSelection !== undefined ?
                        prevProductSelection               :
                        ["MH", "SH", "SvH"]                ;
  //const SUITE_DEFAULT = ["MH", "SH", "SvH"];
  const MH_DEFAULT = prevMhSelection !== undefined ?
                     prevMhSelection               :
                     "Marketing Professional"      ;
  const SH_DEFAULT = prevShSelection !== undefined ?
                     prevShSelection               :
                     "Sales Professional"          ;
  const SvH_DEFAULT = prevSvhSelection !== undefined ?
                      prevSvhSelection               :
                      "Service Professional"         ;

  const [packSelection, setPackSelection] = useState(PACK_DEFAULT);
  const [productSelection, setProductSelection] = useState(PRODUCTS_DEFAULT);
  const [mhSelection, setMhSelection] = useState(MH_DEFAULT)
  const [shSelection, setShSelection] = useState(SH_DEFAULT)
  const [svhSelection, setSvhSelection] = useState(SvH_DEFAULT)

  const radioOptions = [
    {
      label: 'Starter Suite',
      value: 'Starter Suite',
      initialIsChecked: false,
      readonly: false,
      description: `This is the Starter pack`,
    },
    {
      label: `Professional Suite`,
      value: `Professional Suite`,
      initialIsChecked: false,
      readonly: false,
      description: `This is the Professional pack`,
    },
    {
      label: `Enterprise Suite`,
      value: `Enterprise Suite`,
      initialIsChecked: false,
      readonly: false,
      description: `This is the Enterprise pack`,
    },
    {
      label: `Custom`,
      value: 'Custom',
      initialIsChecked: false,
      readonly: false,
      description: `This is a custom pack`,
    }];

    const checkOptions = [
      {
        label: 'MH',
        value: 'MH',
        initialIsChecked: false,
        readonly: false,
      },
      {
        label: `SH`,
        value: `SH`,
        initialIsChecked: false,
        readonly: false,
      },
      {
        label: `SvH`,
        value: `SvH`,
        initialIsChecked: false,
        readonly: false,
      }];

  function handlePackSelection (toggle_pack ) {
    // Save pack and products selection form data
    setPackSelection(toggle_pack);
    //setproductSelection(SUITE_DEFAULT);
    //console.log("----", toggle_pack, "----")
    if (toggle_pack === "Starter Suite") {
      setProductSelection(SUITE_DEFAULT)
      setMhSelection('Marketing Starter');
      setShSelection('Sales Starter');
      setSvhSelection('Service Starter');
    } else if (toggle_pack === "Professional Suite") {
      setProductSelection(SUITE_DEFAULT)
      setMhSelection('Marketing Professional');
      setShSelection('Sales Professional');
      setSvhSelection('Service Professional');
    }else if (toggle_pack === "Enterprise Suite") {
      setProductSelection(SUITE_DEFAULT)
      setMhSelection('Marketing Enterprise');
      setShSelection('Sales Enterprise');
      setSvhSelection('Service Enterprise');
    } else {
      setProductSelection([])
      setMhSelection('<Marketing Hub>');
      setShSelection('<Sales Hub>');
      setSvhSelection('<Service Hub>');
    }
  };

  return (
    <Flex direction="column" gap="xs">
      <ToggleGroup
        name="toggle-checkboxes"
        label="Toggle these things"
        error={false}
        options={radioOptions}
        tooltip="Here's a secret tip."
        //validationMessage="Make sure you do the thing correctly."
        required={false}
        inline={false}
        value={packSelection}
        toggleType="radioButtonList"
        variant="default"
        onChange={toggle_pack => handlePackSelection(toggle_pack)}
      />
      {packSelection === 'Custom' && (
        <Form>
          <Flex direction="column" gap="xs">
            <ToggleGroup
              name="toggle-checkboxes"
              label="Toggle these things"
              error={false}
              options={checkOptions}
              tooltip="Here's a secret tip."
              //validationMessage="Make sure you do the thing correctly."
              required={false}
              inline={true}
              value={productSelection}
              toggleType="checkboxList"
              variant="default"
              onChange={toggle_products => setProductSelection(toggle_products)}
            />
            {productSelection.length != 0 && (
              <>
                <Text>Select the subscription level</Text>
                {productSelection.includes('MH') && (
                  <Select
                    name="best-char"
                    placeholder="<Marketing Hub>"
                    required={true}
                    onChange={value => setMhSelection(value)}
                    options={[
                      { label: 'Marketing Starter', value: 'Marketing Starter' },
                      { label: 'Marketing Professional', value: 'Marketing Professional' },
                      { label: 'Marketing Enterprise', value: 'Marketing Enterprise' },
                    ]}
                    variant='default'
                    value={mhSelection}
                  />
                )}
                {productSelection.includes('SH') && (
                  <Select
                    name="best-char"
                    placeholder="<Sales Hub>"
                    required={true}
                    onChange={value => setShSelection(value)}
                    options={[
                      { label: 'Sales Starter', value: 'Sales Starter' },
                      { label: 'Sales Professional', value: 'Sales Professional' },
                      { label: 'Sales Enterprise', value: 'Sales Enterprise' },
                    ]}
                    variant='default'
                    value={shSelection}
                  />
                )}
                {productSelection.includes('SvH') && (
                  <Select
                    name="best-char"
                    placeholder="<Service Hub>"
                    required={true}
                    onChange={value => setSvhSelection(value)}
                    options={[
                      { label: 'Service Starter', value: 'Service Starter' },
                      { label: 'Service Professional', value: 'Service Professional' },
                      { label: 'Service Enterprise', value: 'Service Enterprise' },
                    ]}
                    variant='default'
                    value={svhSelection}
                  />
                )}
              </>
            )}
            <Box>
            <Button
              onClick={() => onBack()}
              variant="secondary"
              type="button"
            >
              Back
            </Button>
            
            <Button
              onClick={() => onNext({ packSelection, productSelection, mhSelection, shSelection, svhSelection })}
              variant="primary"
              type="button"
              disabled={productSelection.length == 0 ||
                        (productSelection.includes('MH') && mhSelection == 'tbd') ||
                        (productSelection.includes('SH') && shSelection == 'tbd') ||
                        (productSelection.includes('SvH') && svhSelection == 'tbd')}
            >
              Next
            </Button>
            </Box>
          </Flex>
        </Form>
      )}
      {packSelection != 'Custom' && (
        <Box>
        <Button
          onClick={() => onBack()}
          variant="secondary"
          type="button"
        >
          Back
        </Button>
        
        <Button
          onClick={() => onNext({ packSelection, productSelection, mhSelection, shSelection, svhSelection })}
          variant="primary"
          type="button"
        >
          Next
        </Button>
        </Box>
      )}
    </Flex>
  );
};
