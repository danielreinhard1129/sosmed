import { Center, Heading, useToast } from '@chakra-ui/react';
import {
  Button,
  Flex,
  Stack,
  Text
} from '@chakra-ui/react';
import Loading from '../Components/Loading';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from '../helper';




const Verification = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast();

  const onBtnVerify = async () => {
    try {
      let res = await axios.patch(`${API_URL}/user/verify`, {}, { // parameter kedua tidak diisi karena pembaruannya di lakukan di backend
        headers: {
          'Authorization': `Bearer ${params.token}`
        }
      });
      console.log("res.data : ", res.data);
      if (res.data.success) {
        toast({
          position: 'top',
          title: `${res.data.message}`,
          status: 'success',
          duration: 2500,
          isClosable: true,
      });
      navigate('/landing')
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
          bg='white'
          boxShadow={'md'}
          p={6}
          my={10}
          mx='5'>
          <Center>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '4xl' }}>
              Verify your Account
            </Heading>
          </Center>
          <Center
            fontSize={{ base: 'sm', sm: 'md' }}
            color='gray.800'
          >
            Click button below to verify your account
          </Center>
          <Stack spacing={6}>
            <Button
              bg={'facebook.500'}
              rounded='full'
              color={'white'}
              _hover={{
                bg: 'facebook.600',
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