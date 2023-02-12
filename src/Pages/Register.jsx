import React from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, InputGroup, InputRightAddon, Text, Flex, Stack } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import FormInputLabel from '../Components/Form';
import Loading from '../Components/Loading';


const RegisPage = (props) => {
    const navigate = useNavigate();
    const [visible, setVisible] = React.useState('password');

    // Store form input
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onBtnRegis = async () => {
        try {
            // console.log(username, email, password);
            // 1. Memeriksa form sudah terisi semua atau belum
            if (username === '' || email === '' || password === '') {
                alert('Fill in all form');
            } else {
                let domain = /\.(com|id|co.id|org|gov|ac.id|my.id|xyz|tv)/;
                console.log(email.match(domain));
                // 2. Memeriksa email benar atau tidak
                if (email.includes('@') && email.match(domain)) {
                    // 3. Memeriksa emailnya sudah terdaftar atau tidak, get data dr db
                    let res = await axios.get(`http://localhost:2000/user?email=` + email);//pake await biar proses get selesai dlu bru jalanin line 31
                    if (res.data.length > 0) {
                        alert("Email is existed, change your email ⚠️");
                    } else {
                        // 4. Mengirim data kedatabase
                        let resPost = await axios.post("http://localhost:2000/user", {
                            username,
                            email,
                            password,
                            status: "unverified",
                            imgProfile: "",
                            role: 'user'
                        });
                        if (resPost.data.id) {
                            alert("Register successfully ✅")
                        } else {
                            alert("Register Failed ❌")
                        }
                    }
                } else {
                    alert("Your email is wrong ⚠️");
                }
            }
        } catch (error) {
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
            <Container maxW='4xl'>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Box m='auto' my='26' py='6' px='8' width='lg' boxShadow='md' bg='white'>
                            <Text fontSize='4xl' fontWeight='bold' style={{ display: 'flex' }}>Welcome to<Text fontSize='4xl' fontWeight='bold' color='twitter.500' pl='2'>TWOTTER</Text></Text>
                            <div style={{ display: 'flex' }}>
                                <Text>Already have an account ?</Text>
                                <Button type='button' ml='1.5' variant='link' colorScheme='twitter' onClick={() => navigate('/')}>Login</Button>
                            </div>
                        <Stack spacing={4}>
                            <FormControl 
                            // my={10}
                            >
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
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button my='4' width='full' type='button' colorScheme='twitter' onClick={onBtnRegis}>
                                    Register
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Flex>
    }
};

export default RegisPage;