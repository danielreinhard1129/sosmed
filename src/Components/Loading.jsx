import React from 'react';
import { Box, Heading, Text, Button, Flex, Image } from '@chakra-ui/react';
import LoadingAnimation from '../assets/loadingAnimation.gif';


export default function Loading() {
    return (
        <Flex
            bg={'gray.50'}
            minH={'100vh'}
            align={'center'}
            justify={'center'}
        >
                <Image src={LoadingAnimation} 
                boxSize='500px'
                alt="loading_animation" />

        </Flex>
    );
}
