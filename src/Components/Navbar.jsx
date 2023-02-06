import React from 'react';
import { Box, Button, ButtonGroup, Container, Flex, Text, Menu, MenuButton, MenuItem, MenuList, Spinner, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { logoutAction } from '../actions/authAction';
import Twotterlogo from '../assets/twotterlogo.png';

const NavbarComp = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector((state) => state.auth.username); // mengambil data dari reducer

    return <Container boxShadow='md' maxW='full'>
        <Container maxW='4xl'>
            <Flex py='2.5' alignItems='center' justifyContent='space-between'>
                <Text fontWeight='bold' fontSize='2xl' color='twitter.500'> <span style={{ display: "flex" }}>TWOTTER  
                <Image src={Twotterlogo} boxSize='40px' alt="twotter_logo" />
                </span></Text>
                {
                    props.loading ?
                        <Spinner /> :
                        // Jika username kosong maka memunculkan button login dan regis
                        username ?
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                    {username}
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => dispatch(logoutAction())}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                            :
                            <ButtonGroup>
                                <Button type='button' colorScheme='twitter' onClick={() => navigate('/')}>Login</Button>
                                {/* cara tampilin suggestion colorScheme itu delete smua sampe '' dibuat ulang nanti muncul */}
                                <Button type='button' variant='outline' colorScheme='twitter' onClick={() => navigate('/regis')}>Register</Button>
                            </ButtonGroup>
                }
            </Flex>
        </Container>
    </Container>
};

export default NavbarComp;