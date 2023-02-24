import React, { useState } from 'react'
import {
    Flex,
    Button,
    useMediaQuery,
    Tooltip,
    Box
} from '@chakra-ui/react'
import {
    FiHome,
    FiUser,
    FiBell,
    FiMail,
} from 'react-icons/fi'
import NavItem from './NavItem'
import { Link } from 'react-router-dom';


export default function Sidebar() {
    // const [navSize, changeNavSize] = useState("large")
    const [isTablet] = useMediaQuery('(max-width: 768px)');
    const navSize = isTablet ? "small" : "large";
    const [isMobile] = useMediaQuery('(max-width: 481px)');

    return (
        <Flex>
            <Flex
                // display="none"
                pos="sticky"
                left="5"
                minH="92.5vh"
                marginTop='-4'
                // boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                borderRadius={navSize == "small" ? "15px" : "30px"}
                w={navSize == "small" ? "75px" : "200px"}
                flexDir="column"
                justifyContent="space-between"
            >
                <Flex
                    // p="5%"
                    flexDir="column"
                    w="100%"
                    alignItems={navSize == "small" ? "center" : "flex-start"}
                    as="nav"
                    mt={5}
                    pr="2"
                >
                    <Link to={'/landing'}>
                        <NavItem navSize={navSize} icon={FiHome} title="Home" />
                    </Link>
                    <Tooltip label="on going">
                        <div>
                            <NavItem navSize={navSize} icon={FiBell} title="Notifications" />
                        </div>
                    </Tooltip>
                    <Tooltip label="on going">
                        <div>
                            <NavItem navSize={navSize} icon={FiMail} title="Messages" />
                        </div>
                    </Tooltip>
                    <Link to={'/myprofile'}>
                        <NavItem navSize={navSize} icon={FiUser} title="Profile" />
                    </Link>
                    <Box w='full'>
                        <Tooltip label='on going'>
                            <div>
                                <Button type='button' colorScheme='twitter'
                                    marginTop="5vh"
                                    marginBottom="5vh"
                                    // borderRadius={navSize == "small" ? "15px" : "15px"}
                                    rounded="full"
                                    // w={navSize == "small" ? "75px" : "180px"}
                                    w="full"


                                    display={{ base: 'none', sm: 'none', md: 'flex' }}
                                    fontSize={{ md: 'sm', lg: 'lg' }}
                                >Trending</Button>
                            </div>
                        </Tooltip>
                    </Box>

                </Flex>
            </Flex>
        </Flex>
    )
};