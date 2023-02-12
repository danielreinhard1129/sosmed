import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Button,
    useMediaQuery
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiUser,
    FiSettings,
    FiBell,
    FiMail,
    FiBookmark
} from 'react-icons/fi'
import { RiHashtag } from 'react-icons/ri'
import NavItem from './NavItem'
import { CgMoreO } from 'react-icons/cg';

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
                minH="100vh"
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
                >
                    {/* hamburger navbar */}
                    {/* <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                /> */}
                    <NavItem navSize={navSize} icon={FiHome} title="Home" />
                    <NavItem navSize={navSize} icon={RiHashtag} title="Explore" />
                    <NavItem navSize={navSize} icon={FiBell} title="Notifications" />
                    <NavItem navSize={navSize} icon={FiMail} title="Messages" />
                    <NavItem navSize={navSize} icon={FiBookmark} title="Bookmarks" />
                    <NavItem navSize={navSize} icon={FiUser} title="Profile" />
                    <NavItem navSize={navSize} icon={CgMoreO} title="More" />
                    <Button type='button' colorScheme='twitter'
                        marginTop="5vh"
                        marginBottom="5vh"
                        borderRadius={navSize == "small" ? "15px" : "15px"}
                        w={navSize == "small" ? "75px" : "180px"}
                        display={{ base: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }}
                    >Tweet</Button>

                </Flex>
                <Flex
                    // p="5%"
                    flexDir="column"
                    w="100%"
                    alignItems={navSize == "small" ? "center" : "flex-start"}
                    display={{ base: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }}
                >
                    <Divider display={navSize == "small" ? "none" : "flex"} />
                    <Flex mt={4} align="center">
                        <Avatar size="sm" src="avatar-1.jpg" />
                        <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                            <Heading as="h3" size="sm">Username</Heading>
                            <Text color="gray">@username1</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
};