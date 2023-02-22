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

    return <Container boxShadow='xs' maxW='full'>
        <Container maxW='6xl'>
            <Flex py='2.5' alignItems='center' justifyContent='space-between'>
                <Text cursor='pointer' fontWeight='bold' fontSize='2xl' color='facebook.500' className='test'
                    onClick={() => navigate(`${link}`)}
                >
                    SOSMED
                </Text>
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
                                            <Text color='blue.500' fontSize='xl'>{dataStatus == 'verified' ? <MdOutlineVerified /> : <></>}</Text>
                                            <Text> {dataStatus}</Text>
                                        </Flex>
                                        <Menu >
                                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} color='white' colorScheme='facebook' rounded="full">
                                                {username}
                                            </MenuButton>

                                            <MenuList position='relative' zIndex='99999'>
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
                                    bgColor="gray.100"
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
                                            <Button type='button' colorScheme='facebook' onClick={() => navigate('/')}>Login</Button>
                                            {/* cara tampilin suggestion colorScheme itu delete smua sampe '' dibuat ulang nanti muncul */}
                                            <Button type='button' variant='outline' colorScheme='facebook' onClick={() => navigate('/register')}>Register</Button>
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