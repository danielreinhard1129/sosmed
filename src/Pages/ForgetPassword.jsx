import React from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, InputGroup, HStack, InputRightAddon, Text, Flex, Stack, Checkbox, Link, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { API_URL } from '../helper';
import Loading from '../Components/Loading';

const ForgetPassword = (props) => {
    const [email, setEmail] = React.useState('');
    const toast = useToast();

    const onBtnForgotPassword = async () => {
        try {
            if (email == '') {
                toast({
                    position: 'top',
                    title: 'Email Empty.',
                    status: 'error',
                    duration: 2500,
                    isClosable: true,
                });
            } else {
                let get = await axios.post(`${API_URL}/user/forgot`, { email: email })
                console.log("data dari get : ", get.data.token)
                if (get.data.success) {
                    alert('silahkan cek email anda');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    if (props.loading) {
        return <Text><Loading /></Text>
    } else {
        return <Box minH={'92.5vh'}>
            <Flex
                mt={20}
                align={'center'}
                justify={'center'}
                bgColor={'#15202b'}
            >
                {/* <Container maxW='4xl'> */}
                <Stack spacing={8} mx={'auto'} maxW={['md', 'lg']} py={12} px={6} shadow={'dark-lg'}>
                    <Box m='auto' my='26' py='6' px='8' bg='white' bgColor={'#15202b'}>
                        <Text color={'white'} fontSize='4xl' fontWeight='bold' style={{ display: 'flex' }}>Forgot<Text fontSize='4xl' fontWeight='bold' color='twitter.500' pl='2'>Password</Text></Text>
                        <FormControl my='6'>
                            <FormLabel color={'white'}>Email address</FormLabel>
                            <Input color={'white'} type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Type in your email address' />
                        </FormControl>
                        <Stack spacing={10} pt={1}>
                            <Button my='4' width='full' type='button' colorScheme='twitter' rounded="full" onClick={onBtnForgotPassword}>
                                Send
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Box>
    }
};

export default ForgetPassword;