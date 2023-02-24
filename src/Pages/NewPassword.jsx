import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightAddon, Text, Flex, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { API_URL } from '../helper';
import Loading from '../Components/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


const NewPassword = (props) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [visible, setVisible] = useState('password')
    const params = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    const onBtnNewPassword = async () => {
        try {
            console.log(params.token)
            if (password != confirmPassword) {
                toast({
                    position: 'top',
                    title: 'Password not Match.',
                    status: 'error',
                    duration: 2500,
                    isClosable: true,
                });
            } else {
                let get = await axios.patch(`${API_URL}/user/newpassword`, {
                    password: password,
                    confirmpassword: confirmPassword
                }, {
                    headers: {
                        'Authorization': `Bearer ${params.token}`
                    }
                })
                console.log("dari gettt", get);
                if (get.data.success) {
                    toast({
                        position: 'top',
                        title: 'Reset Password Success.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    });
                    setTimeout(() => {
                        navigate("/");
                    }, 2000)
                } else {
                    toast({
                        position: 'top',
                        title: 'Reset Password Failed.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
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
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} >
                    <Box m='auto' my='26' py='6' px='8' width='lg' bgColor={'#15202b'} shadow={'dark-lg'}>
                        <Text color={'white'} fontSize='4xl' fontWeight='bold' style={{ display: 'flex' }}>New<Text fontSize='4xl' fontWeight='bold' color='twitter.500' pl='2'>Password</Text></Text>
                        <FormControl my='6'>
                            <FormLabel color={'white'}>Password</FormLabel>
                            <InputGroup>
                                <Input color={'white'} type={visible} onChange={(e) => setPassword(e.target.value)} placeholder='Type in your password' />
                                <InputRightAddon onClick={() => setVisible(visible == 'password' ? 'text' : 'password')}>
                                    {
                                        visible == 'password' ?
                                            <ViewIcon /> :
                                            <ViewOffIcon />
                                    }
                                </InputRightAddon>
                            </InputGroup>
                            {/* <Stack spacing={4}> */}
                            <FormLabel color={'white'} mt={6}>Confirmation Password</FormLabel>
                            <InputGroup>
                                <Input color={'white'} type={visible} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm your password' />
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
                            <Button my='4' width='full' type='button' colorScheme='twitter' rounded="full" onClick={onBtnNewPassword}>
                                Send
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
                {/* </Container> */}
            </Flex>
        </Box>
    }
};

export default NewPassword;