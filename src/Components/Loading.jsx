import React from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';


export default function Loading() {

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
        >
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </Flex>
    );
}
