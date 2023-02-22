import React from 'react';
import {
  Stack,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

export const SearchBar = () => {
  return (
<Stack spacing={4}>
  <InputGroup>
    <InputLeftElement
      pointerEvents='none'
      children={<FiSearch color='gray.300' />}
    />
    <Input type='search' variant='filled' placeholder='Find in Twotter' />
  </InputGroup>
</Stack>
  );
};
