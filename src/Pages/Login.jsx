import React from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, InputGroup, InputRightAddon, Text, Flex, Stack, Checkbox, Link } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { checkEmail } from '../helper';
import axios from 'axios';
import { API_URL } from '../helper';
import { useDispatch } from 'react-redux';
import { loginAction } from '../actions/authAction';
import { FcGoogle } from 'react-icons/fc';
import Loading from '../Components/Loading';

const LoginPage = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [visible, setVisible] = React.useState('password');

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleVisible = () => {
        if (visible == 'password') {
            setVisible('text');
        } else {
            setVisible('password');
        }
    }

    const onBtnLogin = async () => {
        try {
            // alert(`${email} ${password}`);
            if (email == '' || password == '') {
                alert('Fill in all form');
            } else {
                if (checkEmail(email)) {
                    // Lanjut login
                    let response = await axios.get(`${API_URL}/user?email=${email}&password=${password}`);
                    console.log("Check response login", response.data);
                    if (response.data.length == 0) {
                        alert('Account not found')
                    } else {
                        // Menyimpan data kelocalstorage browser untuk keepLogin
                        localStorage.setItem('socio_login', response.data[0].id);
                        // Lanjut simpan response.data ke reducer
                        dispatch(loginAction(response.data[0]));
                        navigate('/landing', { replace: true });
                        // alert(`Welcome, ${response.data[0].username}`)
                    }
                } else {
                    alert('Your email is wrong ⚠️')
                }
            }

        } catch (error) {
            console.log(error)
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
            <Container maxW='4xl'>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Box m='auto' my='26' py='6' px='8' width='lg' boxShadow='md' bg='white' >
                        <Text fontSize='4xl' fontWeight='bold' style={{ display: 'flex' }}>Sign in for<Text fontSize='4xl' fontWeight='bold' color='twitter.500' pl='2'>Sharing</Text></Text>
                        <div style={{ display: 'flex' }}>
                            <Text>Don't have an account ?</Text>
                            <Button type='button' ml='1.5' variant='link' colorScheme='twitter' onClick={() => navigate('/regis')}>Register Now</Button>
                        </div>
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
                        {/* <div style={{ textAlign: 'right' }}>
                        <Button type='button' ml='1.5' variant='link'>Forgot password ?</Button>
                    </div> */}
                        <Stack spacing={10} pt={2}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'twitter.500'}>Forgot password?</Link>
                            </Stack>
                            <Button my='4' width='full' type='button' colorScheme='twitter' onClick={onBtnLogin}>
                                Login
                            </Button>
                        </Stack>
                        <Button mt='3' mb='4' width='full' variant='outline' type='button' onClick={() => navigate('/')}>
                            <FcGoogle size={36} style={{ marginRight: '12px' }} /> <span> Sign in with Google</span>
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Flex>
    }
};

export default LoginPage;