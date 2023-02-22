import React from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, InputGroup, InputRightAddon, Text, Flex, Stack, useToast } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormInputLabel from '../Components/Form';
import Loading from '../Components/Loading';
import { API_URL } from '../helper';


const RegisPage = (props) => {
    const navigate = useNavigate();
    const [visible, setVisible] = React.useState('password');

    // Store form input
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmationPassword, setConfirmationPassword] = React.useState('');
    const toast = useToast();

    const onBtnRegis = async () => {
        try {
            let res = await axios.post(`${API_URL}/user/register`, { //param ke 2 data yg mau di post, param 3 gaada gpp dan itu header
                username: username,
                email: email,
                password: password,
                confirmpassword:confirmationPassword
            }
            );
            console.log(res);
            if (res.data.success) {
                toast({
                    position: 'top',
                    title: `Register Success`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            } 
        } catch (error) {
            console.log(error.response);
            alert(error.response.data.message);
            toast({
                position: 'top',
                title: `${error.response.data.message}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            console.log(error);
        }

    }
    if (props.loading) {
        return <Text><Loading /></Text>
    } else {
        return <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={'gray.50'}
        >
            {/* <Container maxW='4xl'> */}
                <Stack spacing={8} mx={'auto'} maxW={['md','lg']} py={12} px={6}>
                    <Box m='auto' my='26' py='6' px='8' boxShadow='md' bg='white'>
                        <Text fontSize={{base: '3xl', md: '4xl'}} fontWeight='bold' style={{ display: 'flex' }}>Register<Text fontSize={{base: '3xl', md: '4xl'}} fontWeight='bold' color='facebook.500' pl='2'>Sosmed</Text></Text>
                        <div style={{ display: 'flex' }}>
                            <Text>Already have an account ?</Text>
                            <Button type='button' ml='1.5' variant='link' colorScheme='facebook' onClick={() => navigate('/')}>Login</Button>
                        </div>
                        <Stack spacing={4}>
                            <FormControl>
                                <FormInputLabel name='Username' type='text' onChange={(e) => setUsername(e.target.value)} placeholder='Type in your username' />
                                <FormInputLabel name='Email address' type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Type in your email address' />
                                <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input type={visible} onChange={(e) => setPassword(e.target.value)} placeholder='Type in your password' />
                                        <InputRightAddon onClick={() => setVisible(visible == 'password' ? 'text' : 'password')}>
                                            {
                                                visible == 'password' ?
                                                    <ViewIcon /> :
                                                    <ViewOffIcon />
                                            }
                                        </InputRightAddon>
                                    </InputGroup>
                                        {/* <Stack spacing={4}> */}
                                <FormLabel mt={6}>Confirmation Password</FormLabel>
                                <InputGroup>
                                    <Input type={visible} onChange={(e) => setConfirmationPassword(e.target.value)} placeholder='Confirm your password' />
                                    <InputRightAddon onClick={() => setVisible(visible == 'password' ? 'text' : 'password')}>
                                        {
                                            visible == 'password' ?
                                            <ViewIcon /> :
                                            <ViewOffIcon />
                                        }
                                    </InputRightAddon>
                                </InputGroup>
                                        
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button my='4' width='full' type='button' colorScheme='facebook' rounded="full" onClick={onBtnRegis}>
                                    Register
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            {/* </Container> */}
        </Flex>
    }
};

export default RegisPage;