import React, { useState } from 'react';
import { Flex, Form, NumberInput, Button, Box, ToggleGroup } from '@hubspot/ui-extensions';

export const ProductSelection = ({ onNext }) => {
  const PASSENGERS_DEFAULT = 10;
  const DISTANCE_DEFAULT = 50;

  const [passengers, setPassengers] = useState(PASSENGERS_DEFAULT);
  const [distance, setDistance] = useState(DISTANCE_DEFAULT);
  /*const options = [1, 2, 3, 4].map(n => ({
    label: `Option ${n}`,
    value: `${n}`,
    initialIsChecked: n === 2,
    readonly: false,
    description: `This is option ${n}`,
  }));
*/
  const options = [
    {
      label: `Starter Suite`,
      value: '1',
      initialIsChecked: false,
      readonly: false,
      description: `This is the Starter pack`,
    },
    {
      label: `Professional Suite`,
      value: '2',
      initialIsChecked: true,
      readonly: false,
      description: `This is the Professional pack`,
    },
    {
      label: `Enterprise Suite`,
      value: '3',
      initialIsChecked: false,
      readonly: false,
      description: `This is the Enterprise pack`,
    },
    {
      label: `Custom`,
      value: '4',
      initialIsChecked: false,
      readonly: false,
      description: `This is a custom pack`,
    }]

  return (
    <Form>
    <ToggleGroup
      name="toggle-checkboxes"
      label="Toggle these things"
      error={false}
      options={options}
      tooltip="Here's a secret tip."
      validationMessage="Make sure you do the thing correctly."
      required={false}
      inline={false}
      toggleType="radioButtonList"
      variant="default"
    />
    <Button
      onClick={() => onNext({ passengers, distance })}
      variant="secondary"
      type="button"
      disabled={!distance || !passengers}
    >
      Next
    </Button>
    </Form>
  );
};
