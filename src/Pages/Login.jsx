import React from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, InputGroup, HStack, InputRightAddon, Text, Flex, Stack, Checkbox, Link, Tooltip, useToast } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../helper';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../actions/authAction';
import { FcGoogle } from 'react-icons/fc';
import Loading from '../Components/Loading';

const LoginPage = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = useSelector((state) => {
        console.log("cek", state.auth);
        return state.auth.role
    });
    const [visible, setVisible] = React.useState('password');
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState('');
    const toast = useToast();

    console.log("role reducer", role);
    const handleVisible = () => {
        if (visible == 'password') {
            setVisible('text');
        } else {
            setVisible('password');
        }
    }

    const onBtnLogin = async () => {
        try {
            if (email === '' || password === '') {
                toast({
                    position: 'top',
                    title: 'Email or Password Empty.',
                    status: 'error',
                    duration: 2500,
                    isClosable: true,
                });
            } else {
                let res = await axios.post(`${API_URL}/user/auth`, {
                    username: username,
                    email: email,
                    password: password
                });
                console.log("ini dari ressssss", res.data);
                if (res.data.length === 0) {
                    toast({
                        position: 'top',
                        title: 'Incorrect Email or Password.',
                        status: 'error',
                        duration: 2500,
                        isClosable: true,
                    });
                } else {
                    // local storage hanya bisa menyimpan data dalam bentuk string
                    localStorage.setItem('sosmed_login', res.data.token); // menyimpan data ke local storage jd tidak perlu login lg
                    dispatch(loginUserAction(res.data));
                    navigate('/landing', { replace: true }); // replace page login, agar tidak bisa di back ke login page

                    // alert("Login berhasil")
                }
            }
        } catch (error) {
            console.log(error);
            toast({
                position: 'top',
                title: `${error.response.data.message}`,
                status: 'error',
                duration: 2500,
                isClosable: true,
            });
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
            <Stack spacing={8} mx={'auto'} maxW={['md', 'lg']} py={12} px={6}>
                <Box m='auto' my='26' py='6' px='8' boxShadow='md' bg='white' >
                    <Text fontSize={{ base: '3xl', md: '4xl' }} fontWeight='bold' style={{ display: 'flex' }}>Sign in<Text fontSize={{ base: '3xl', md: '4xl' }} fontWeight='bold' color='facebook.500' pl='2'>Sosmed</Text></Text>
                    <Flex pt="2">
                        <Text>Don't have an account?</Text>
                        <Button type='button' ml='1.5' variant='link' colorScheme='facebook' onClick={() => navigate('/register')}>Register Now</Button>
                    </Flex>
                    <FormControl my='6'>
                        <FormLabel>Email address</FormLabel>
                        <Input type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Type in your email address' />
                        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    </FormControl>
                    <FormControl my='6'>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type={visible} onChange={(e) => setPassword(e.target.value)} placeholder='Type in your password' />
                            <InputRightAddon onClick={handleVisible}>
                                {
                                    visible == 'password' ?
                                        <ViewIcon /> :
                                        <ViewOffIcon />
                                }
                            </InputRightAddon>
                        </InputGroup>
                        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    </FormControl>
                    {/* </Box> */}
                    {/* </HStack> */}
                    {/* </Stack> */}
                    {/* <div style={{ textAlign: 'right' }}>
                        <Button type='button' ml='1.5' variant='link'>Forgot password ?</Button>
                    </div> */}
                    <Stack spacing={10} pt={2}>
                        <Stack
                            direction={{ sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <Checkbox>Remember me</Checkbox>
                            <Link onClick={() => navigate('/forgot')} color={'facebook.500'}>Forgot password?</Link>
                        </Stack>
                        <Button my='4' width='full' type='button' colorScheme='facebook' rounded="full" onClick={onBtnLogin}>
                            Login
                        </Button>
                    </Stack>
                    <Tooltip label="ongoing">
                        <div>
                            <Button mt='3' mb='4' width='full' variant='outline' type='button' rounded="full" onClick={() => navigate('/')}>
                                <FcGoogle size={36} style={{ marginRight: '12px' }} /> <span> Sign in with Google</span>
                            </Button>
                        </div>
                    </Tooltip>
                </Box>
            </Stack>
            {/* </Container> */}
        </Flex>
    }
};

export default LoginPage;