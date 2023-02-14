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
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';


// onBtnVerifikasi

const Verification = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.token); //di console kluarin token
  
  const onBtnVerify=async()=>{
    try {
      let res = await axios.patch('http://localhost:2000/user/verify', {}, { // objek kosong ditulis krn kita butuh parameter ke 3 untuk nulis headers (konfig headers di p 3)
        headers:{ //pasti headers, krn token dibaca di headers
          'Authorization': `Bearer ${params.token}` //ini yg di thunderclient, authorixation itu bawaan jg
        }
      });
      console.log(res.data);
      if(res.data.success){ //dari file expense api tracker
        alert(res.data.message);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }


  if (props.loading) {
    return <Text><Loading /></Text>
  } else {
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg='gray.50'>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'sm'}
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
            color='gray.800'
            >
            We have sent code to your email
          </Center>
          <Center
            fontSize={{ base: 'sm', sm: 'md' }}
            fontWeight="bold"
            color='gray.800'
            >
            username@mail.com
          </Center>
          <FormControl>
            <Center>
              <HStack>
                {/* <PinInput>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput> */}
              </HStack>
            </Center>
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'twitter.500'}
              color={'white'}
              _hover={{
                bg: 'twitter.600',
              }}
              type='button'
              onClick={onBtnVerify}
              >
              Verify
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }
};

export default Verification;