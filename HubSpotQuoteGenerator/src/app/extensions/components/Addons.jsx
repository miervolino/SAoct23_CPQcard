import { Button, Box, Select, ToggleGroup } from '@hubspot/ui-extensions';
import { useState, useMemo } from 'react';

export const Addons = ({ passengers, onNext }) => {

  const handleNextButtonClick = () => {
    
  };
  const options = [
    {
      label: `Transactional Email`,
      value: '1',
      initialIsChecked: false,
      readonly: false,
      description: `Transactional Email`,
    },
    {
      label: `Dedicated IP`,
      value: '2',
      initialIsChecked: true,
      readonly: false,
      description: `Dedicated IP`,
    },
    {
      label: `Business Units`,
      value: '3',
      initialIsChecked: false,
      readonly: false,
      description: `Business Units`,
    },
    {
      label: `Reporting`,
      value: '4',
      initialIsChecked: false,
      readonly: false,
      description: `Reporting`,
    }]

  return (
    <>
      <ToggleGroup
      name="toggle-checkboxes"
      label="Toggle these things"
      error={false}
      options={options}
      tooltip="Here's a secret tip."
      validationMessage="Make sure you do the thing correctly."
      required={false}
      inline={false}
      toggleType="checkboxList"
      variant="default"
    />
      <Box>
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