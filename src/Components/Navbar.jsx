import React from 'react';
import { Box, Button, ButtonGroup, Container, Flex, Text, Menu, MenuButton, MenuItem, MenuList, Spinner, Image, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { logoutAction } from '../actions/authAction';
import Twotterlogo from '../assets/twotterlogo.png';
import {
    FiMenu
} from 'react-icons/fi';
import { IoClose } from "react-icons/io5";
import { useState } from 'react';

const NavbarComp = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector((state) => state.auth.username); // mengambil data dari reducer
    const [display, changeDisplay] = useState('none')

    return <Container boxShadow='xs' maxW='full'>
        <Container maxW='6xl'>
            <Flex py='2.5' alignItems='center' justifyContent='space-between'>
                <Text fontWeight='bold' fontSize='2xl' color='twitter.500' className='test'> <span style={{ display: "flex" }}>
                    <Text mr='1'>
                        TWOTTER
                    </Text>
                    <Image src={Twotterlogo} boxSize='40px' alt="twotter_logo" />
                </span></Text>
                {
                    props.loading ?
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='twitter.500'
                            size='lg'
                        /> :
                        // Jika username kosong maka memunculkan button login dan regis
                        username ?
                            <Flex>
                                <Flex
                                    position="sticky"
                                    top="1rem"
                                    right="1rem"
                                    align="center"
                                >
                                    {/* Desktop */}
                                    <Flex
                                        display={{ base: 'none', md: 'none', lg: 'flex', xl: 'flex' }}
                                    >
                                        <Menu>
                                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} color='white' colorScheme='twitter'>
                                                Welcome, {username}
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem onClick={() => dispatch(logoutAction())}>Logout</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Flex>
                                    {/* Mobile */}
                                    <IconButton
                                        aria-label="Open Menu"
                                        size="md"
                                        mr={-5}
                                        icon={
                                            <FiMenu />
                                        }
                                        onClick={() => changeDisplay('flex')}
                                        display={{ base: 'flex', md: 'flex', lg: 'none', xl: 'none' }}
                                    />
                                </Flex>
                                {/* Mobile Content */}
                                <Flex
                                    w='100vw'
                                    display={display}
                                    bgColor="gray.50"
                                    zIndex={20}
                                    h="28vh"
                                    pos="fixed"
                                    top="0"
                                    left="0"
                                    overflowY="auto"
                                    flexDir="column"
                                >
                                    <Flex justify="flex-end">
                                        <IconButton
                                            mt={2}
                                            mr={8}
                                            aria-label="Open Menu"
                                            size="md"
                                            icon={
                                                <IoClose />
                                            }
                                            onClick={() => changeDisplay('none')}
                                        />
                                    </Flex>
                                    <Flex
                                        flexDir="column"
                                        align="center"
                                    >
                                        {/* <ButtonGroup> */}
                                        <Button
                                            type='button'
                                            variant="ghost"
                                            aria-label="Login"
                                            as={Button}
                                            my={2}
                                            w="100%"
                                        >Welcome, {username}</Button>
                                        <Button
                                            type='button'
                                            variant="ghost"
                                            aria-label="Profile"
                                            w="100%"
                                        >Profile</Button>
                                        <Button
                                            type='button'
                                            variant="ghost"
                                            aria-label="Logout"
                                            w="100%"
                                            my={2}
                                            onClick={() => dispatch(logoutAction())}
                                        >Logout</Button>
                                        {/* </ButtonGroup> */}

                                    </Flex>
                                </Flex>
                            </Flex>
                            :
                            <Flex>
                                <Flex
                                    position="sticky"
                                    top="1rem"
                                    right="1rem"
                                    align="center"
                                >
                                    {/* Desktop */}
                                    <Flex
                                        display={{ base: 'none', md: 'none', lg: 'flex', xl: 'flex' }}
                                    >
                                        <ButtonGroup>
                                            <Button type='button' colorScheme='twitter' onClick={() => navigate('/')}>Login</Button>
                                            {/* cara tampilin suggestion colorScheme itu delete smua sampe '' dibuat ulang nanti muncul */}
                                            <Button type='button' variant='outline' colorScheme='twitter' onClick={() => navigate('/regis')}>Register</Button>
                                        </ButtonGroup>
                                    </Flex>
                                    {/* Mobile */}
                                    <IconButton
                                        aria-label="Open Menu"
                                        size="md"
                                        mr={-5}
                                        icon={
                                            <FiMenu />
                                        }
                                        onClick={() => changeDisplay('flex')}
                                        display={{ base: 'flex', md: 'flex', lg: 'none', xl: 'none' }}
                                    />
                                </Flex>
                                {/* Mobile Content */}
                                <Flex
                                    w='100vw'
                                    display={display}
                                    bgColor="gray.50"
                                    zIndex={20}
                                    h="22vh"
                                    pos="fixed"
                                    top="0"
                                    left="0"
                                    overflowY="auto"
                                    flexDir="column"
                                >
                                    <Flex justify="flex-end">
                                        <IconButton
                                            mt={2}
                                            mr={8}
                                            aria-label="Open Menu"
                                            size="md"
                                            icon={
                                                <IoClose />
                                            }
                                            onClick={() => changeDisplay('none')}
                                        />
                                    </Flex>
                                    <Flex
                                        flexDir="column"
                                        align="center"
                                    >
                                        {/* <ButtonGroup> */}
                                        <Button
                                            type='button'
                                            variant="ghost"
                                            aria-label="Login"
                                            my={2}
                                            w="100%"
                                            onClick={() => navigate('/')}
                                        >Login</Button>
                                        {/* cara tampilin suggestion colorScheme itu delete smua sampe '' dibuat ulang nanti muncul */}
                                        <Button
                                            type='button'
                                            variant="ghost"
                                            aria-label="Register"

                                            w="100%"
                                            onClick={() => navigate('/regis')}
                                        >Register</Button>
                                        {/* </ButtonGroup> */}
                                    </Flex>
                                </Flex>
                            </Flex>
                }
            </Flex>
        </Container>
    </Container>
};

export default NavbarComp;