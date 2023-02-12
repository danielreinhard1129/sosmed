import { Center, Heading } from '@chakra-ui/react';
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Image,
  Text
} from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import Twotterlogo from '../assets/twotterlogo.png';
import Loading from '../Components/Loading';
import { useParams } from 'react-router-dom'


// onBtnVerifikasi

const Verification = async (props) => {
  const params = useParams();
  console.log(params.token); //di console kluarin token
  let res = await axios.patch('http:localhost:2000/users/verify', {
    headers:{
      'Authorization': `Bearer ${params.token}`
    }
  })


  if (props.loading) {
    return <Text><Loading /></Text>
  } else {
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        // bg={useColorModeValue('gray.50', 'gray.800')}
        bg='gray.50'>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'sm'}
          // bg={useColorModeValue('white', 'gray.700')}
          bg = 'white'
          // rounded={'xl'}
          boxShadow={'md'}
          p={6}
          my={10}>
          <Center>
            <Image src={Twotterlogo} boxSize='40px' alt="twotter_logo" />
          </Center>
          <Center>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '4xl' }}>
              Verify your Email
            </Heading>
          </Center>
          <Center
            fontSize={{ base: 'sm', sm: 'md' }}
            // color={useColorModeValue('gray.800', 'gray.400')}
            color='gray.800'
            >
            We have sent code to your email
          </Center>
          <Center
            fontSize={{ base: 'sm', sm: 'md' }}
            fontWeight="bold"
            // color={useColorModeValue('gray.800', 'gray.400')}
            color='gray.800'
            >
            username@mail.com
          </Center>
          <FormControl>
            <Center>
              <HStack>
                <PinInput>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </Center>
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'twitter.500'}
              color={'white'}
              _hover={{
                bg: 'twitter.600',
              }}>
              Verify
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }
};

export default Verification;