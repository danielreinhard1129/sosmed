import React from 'react';
import { Box, Button, ButtonGroup, Container, Flex, Text, Menu, MenuButton, MenuItem, MenuList, Spinner, Image, IconButton, Tooltip } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { logoutUserAction } from '../actions/authAction';
import {
    FiMenu
} from 'react-icons/fi';
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import { MdOutlineVerified } from "react-icons/md";
import sosmed from '../assets/sosmed.png';

const NavbarComp = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector((state) => state.auth.username); // mengambil data dari reducer
    const [display, changeDisplay] = useState('none');
    const dataStatus = useSelector((state) => state.auth.status)
    console.log("ini username", username);

    let link = ''
    if (username) {
        link = '/landing'
    } else {
        link = '/'
    }

    return <Container bgColor={'#15202b'} boxShadow='xs' maxW='full'>
        <Container maxW='6xl'>
            <Flex py='2.5' alignItems='center' justifyContent='space-between'>
                <Image src={sosmed} onClick={() => navigate(`${link}`)} w={'40'}></Image>
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
                                        <Flex alignItems='center' mr='2' gap='1'>
                                            <Text color='white' fontSize='xl'>{dataStatus == 'verified' ? <MdOutlineVerified /> : <></>}</Text>
                                            <Text color={'white'}> {dataStatus}</Text>
                                        </Flex>
                                        <Menu pos={'relative'}>
                                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} color='white' colorScheme='twitter' rounded="full">
                                                {username}
                                            </MenuButton>

                                            <MenuList zIndex='999'>
                                                {
                                                    dataStatus == 'unverified' ?
                                                        <Tooltip label='on going'>
                                                            <div>
                                                                <MenuItem>
                                                                    Reverification
                                                                </MenuItem>
                                                            </div>
                                                        </Tooltip>
                                                        :
                                                        <>
                                                        </>
                                                }
                                                <MenuItem onClick={() => {
                                                    dispatch(logoutUserAction());
                                                    navigate('/', { replace: true });
                                                }}>
                                                    Logout
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Flex>
                                    {/* Mobile */}
                                    <IconButton
                                        aria-label="Open Menu"
                                        size="md"
                                        bgColor='transparent'
                                        mr={-5}
                                        icon={
                                            <FiMenu color='white'/>
                                        }
                                        onClick={() => changeDisplay('flex')}
                                        display={{ base: 'flex', md: 'flex', lg: 'none', xl: 'none' }}
                                    />
                                </Flex>
                                {/* Mobile Content */}
                                <Flex
                                    w='100vw'
                                    display={display}
                                    bgColor="gray.700"
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
                                            mr={3}
                                            aria-label="Open Menu"
                                            bgColor={'transparent'}
                                            size="md"
                                            icon={
                                                <IoClose color='white'/>
                                            }
                                            onClick={() => changeDisplay('none')}
                                        />
                                    </Flex>
                                    <Flex
                                        flexDir="column"
                                        align="center"
                                        color={'white'}
                                    >
                                        {/* <ButtonGroup> */}
                                        <Button
                                            type='button'
                                            variant="ghost"
                                            aria-label="Profile"
                                            w="100%"
                                            my={2}
                                            onClick={() => {
                                                navigate('/landing');
                                            }
                                            }
                                        >Home</Button>
                                        <Button
                                            type='button'
                                            variant="ghost"
                                            aria-label="Login"
                                            as={Button}
                                            my={2}
                                            w="100%"
                                            onClick={() => {
                                                navigate('/myprofile');
                                            }
                                            }
                                        >Profile</Button>

                                        <Button
                                            type='button'
                                            variant="ghost"
                                            aria-label="Logout"
                                            w="100%"
                                            my={2}
                                            onClick={() => {
                                                dispatch(logoutUserAction());
                                                navigate('/', { replace: true });
                                            }
                                            }
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
                                            <Button type='button' variant='outline' colorScheme='twitter' onClick={() => navigate('/register')}>Register</Button>
                                        </ButtonGroup>
                                    </Flex>
                                    {/* Mobile */}
                                    <IconButton
                                        aria-label="Open Menu"
                                        size="md"
                                        bgColor={'transparent'}
                                        mr={-5}
                                        icon={
                                            <FiMenu color='white'/>
                                        }
                                        onClick={() => changeDisplay('flex')}
                                        display={{ base: 'flex', md: 'flex', lg: 'none', xl: 'none' }}
                                    />
                                </Flex>
                                {/* Mobile Content */}
                                <Flex
                                    w='100vw'
                                    display={display}
                                    bgColor="gray.700"
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
                                            mr={4}
                                            aria-label="Open Menu"
                                            bgColor={'transparent'}
                                            size="md"
                                            icon={
                                                <IoClose color='white'/>
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
                                            color={'white'}
                                            my={2}
                                            w="100%"
                                            onClick={() => navigate('/')}
                                        >Login</Button>
                                        {/* cara tampilin suggestion colorScheme itu delete smua sampe '' dibuat ulang nanti muncul */}
                                        <Button
                                            type='button'
                                            variant="ghost"
                                            aria-label="Register"
                                            color={'white'}
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