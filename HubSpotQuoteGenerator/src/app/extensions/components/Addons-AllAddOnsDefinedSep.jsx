// In this document all the add ons are defined separetly at the level of the React Components
import { Button, Box, Select, ToggleGroup, Table, TableHead, TableBody, TableRow, TableCell, TableHeader, NumberInput } from '@hubspot/ui-extensions';
import { useState, useMemo } from 'react';

export const Addons = ({ onNext, onBack }) => {

  const handleNextButtonClick = () => {
    
  };

  const [addOnIncluded, setAddOnIncluded] = useState(false)
  const [addOnQuantity, setAddOnQuantity] = useState(0)

  return (
    <>
      <Table 
        bordered={true}
        paginated={true}
        pageCount="1"
      >
        <TableHead>
          <TableRow>
            <TableHeader width="min">Select</TableHeader>
            <TableHeader>Add-Ons</TableHeader>
            <TableHeader>Quantities</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <ToggleGroup
                options={[{value: "Add-On 1 included"}]}
                toggleType="checkboxList"
                onChange={() => {
                  setAddOnIncluded(!addOnIncluded);
                }}
              />
            </TableCell>
            <TableCell>Add On 1</TableCell>
            <TableCell>
              <NumberInput
                placeholder={'Add-Ons needed'}
                value={addOnQuantity}
                readOnly={!addOnIncluded}
                onChange={value => {setAddOnQuantity(value)}}
              />
            </TableCell>
          </TableRow>
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